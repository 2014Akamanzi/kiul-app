import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// Initialize Resend with fallback for build time
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder_for_build");

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text, html } = await req.json();

    if (!to || !subject) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject" },
        { status: 400 }
      );
    }

    // If no API key is set, log instead of sending
    if (!process.env.RESEND_API_KEY) {
      console.log("📧 Email notification (API key not configured):");
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${text || html?.substring(0, 200)}`);
      return NextResponse.json({ message: "Email logged (no API key)" });
    }

    const emailPayload: any = {
      from: "KIUL Publishing <noreply@katokifoundation.org>",
      to: [to],
      subject,
    };

    // Use HTML if provided, otherwise use text
    if (html) {
      emailPayload.html = html;
      if (text) emailPayload.text = text; // Include text version as fallback
    } else {
      emailPayload.text = text;
    }

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully", data });
  } catch (error: any) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
