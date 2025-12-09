import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

interface CrossRefAuthor {
  given_name: string;
  surname: string;
  orcid?: string;
}

interface DOIRegistrationRequest {
  manuscriptId: string;
  doi: string;
  title: string;
  authors: CrossRefAuthor[];
  abstract: string;
  publicationDate: string;
  pdfUrl: string;
  volume?: string;
  issue?: string;
  pages?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: DOIRegistrationRequest = await req.json();
    const {
      manuscriptId,
      doi,
      title,
      authors,
      abstract,
      publicationDate,
      pdfUrl,
      volume,
      issue,
      pages,
    } = body;

    // Validate required fields
    if (!manuscriptId || !doi || !title || !authors || !publicationDate || !pdfUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if CrossRef credentials are configured
    const crossrefUser = process.env.CROSSREF_USER;
    const crossrefPass = process.env.CROSSREF_PASS;
    const crossrefPrefix = process.env.CROSSREF_PREFIX || "10.xxxx";

    if (!crossrefUser || !crossrefPass) {
      console.warn("CrossRef credentials not configured. DOI registration skipped.");
      return NextResponse.json({
        success: false,
        message: "CrossRef credentials not configured",
        registered: false,
      });
    }

    // Validate DOI matches prefix
    if (!doi.startsWith(crossrefPrefix)) {
      return NextResponse.json(
        { error: `DOI must start with ${crossrefPrefix}` },
        { status: 400 }
      );
    }

    // Generate CrossRef XML
    const dateObj = new Date(publicationDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    const authorsXML = authors
      .map(
        (author) => `
      <person_name contributor_role="author" sequence="${authors[0] === author ? 'first' : 'additional'}">
        <given_name>${escapeXML(author.given_name)}</given_name>
        <surname>${escapeXML(author.surname)}</surname>
        ${author.orcid ? `<ORCID authenticated="true">https://orcid.org/${author.orcid}</ORCID>` : ""}
      </person_name>`
      )
      .join("");

    const batchId = `kiul_${Date.now()}_${manuscriptId.substring(0, 8)}`;
    const timestamp = Date.now();

    const crossrefXML = `<?xml version="1.0" encoding="UTF-8"?>
<doi_batch xmlns="http://www.crossref.org/schema/5.3.1"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           version="5.3.1"
           xsi:schemaLocation="http://www.crossref.org/schema/5.3.1 
           https://www.crossref.org/schemas/crossref5.3.1.xsd">
  <head>
    <doi_batch_id>${batchId}</doi_batch_id>
    <timestamp>${timestamp}</timestamp>
    <depositor>
      <depositor_name>KIUL Publishing</depositor_name>
      <email_address>publishing@katokifoundation.org</email_address>
    </depositor>
    <registrant>Katoki Institute for Ubuntu Leadership</registrant>
  </head>
  <body>
    <journal>
      <journal_metadata>
        <full_title>KIUL Journal of Ubuntu Leadership Studies</full_title>
        <abbrev_title>KIUL JULS</abbrev_title>
        <issn media_type="electronic">XXXX-XXXX</issn>
      </journal_metadata>
      <journal_issue>
        ${volume ? `<volume>${volume}</volume>` : ""}
        ${issue ? `<issue>${issue}</issue>` : ""}
        <publication_date media_type="online">
          <year>${year}</year>
          <month>${month}</month>
          <day>${day}</day>
        </publication_date>
      </journal_issue>
      <journal_article publication_type="full_text">
        <titles>
          <title>${escapeXML(title)}</title>
        </titles>
        <contributors>${authorsXML}
        </contributors>
        <jats:abstract xmlns:jats="http://www.ncbi.nlm.nih.gov/JATS1">
          <jats:p>${escapeXML(abstract)}</jats:p>
        </jats:abstract>
        <publication_date media_type="online">
          <year>${year}</year>
          <month>${month}</month>
          <day>${day}</day>
        </publication_date>
        ${pages ? `<pages><first_page>${pages.split('-')[0]}</first_page></pages>` : ""}
        <publisher_item>
          <identifier id_type="manuscript_id">${manuscriptId}</identifier>
        </publisher_item>
        <doi_data>
          <doi>${doi}</doi>
          <resource>${pdfUrl}</resource>
        </doi_data>
      </journal_article>
    </journal>
  </body>
</doi_batch>`;

    // Submit to CrossRef
    const crossrefAuth = Buffer.from(`${crossrefUser}:${crossrefPass}`).toString("base64");
    
    // CrossRef uses their deposit API
    const crossrefResponse = await fetch("https://doi.crossref.org/servlet/deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.crossref.deposit+xml",
        Authorization: `Basic ${crossrefAuth}`,
      },
      body: crossrefXML,
    });

    if (!crossrefResponse.ok) {
      const errorText = await crossrefResponse.text();
      console.error("CrossRef registration failed:", errorText);
      
      return NextResponse.json(
        {
          error: "CrossRef registration failed",
          details: errorText,
          registered: false,
        },
        { status: 500 }
      );
    }

    const responseText = await crossrefResponse.text();

    // Update manuscript in database
    const { error: updateError } = await supabase
      .from("manuscripts")
      .update({
        is_doi_registered: true,
        doi_registered_at: new Date().toISOString(),
      })
      .eq("id", manuscriptId);

    if (updateError) {
      console.error("Failed to update manuscript:", updateError);
      return NextResponse.json(
        {
          error: "DOI registered but failed to update database",
          registered: true,
          crossrefResponse: responseText,
        },
        { status: 500 }
      );
    }

    // Send confirmation email to author
    const { data: manuscript } = await supabase
      .from("manuscripts")
      .select("email, authors")
      .eq("id", manuscriptId)
      .single();

    if (manuscript?.email) {
      const { doiRegistrationEmail } = await import("@/app/lib/emailTemplates");
      const emailTemplate = doiRegistrationEmail(
        manuscript.authors.split(",")[0].trim(),
        title,
        doi,
        pdfUrl
      );

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: manuscript.email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
          text: emailTemplate.text,
        }),
      }).catch((err) => console.error("Email notification failed:", err));
    }

    return NextResponse.json({
      success: true,
      message: "DOI successfully registered with CrossRef",
      doi,
      batchId,
      registered: true,
      crossrefResponse: responseText,
    });
  } catch (error: any) {
    console.error("DOI registration error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to register DOI",
        registered: false,
      },
      { status: 500 }
    );
  }
}

// Helper function to escape XML special characters
function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
