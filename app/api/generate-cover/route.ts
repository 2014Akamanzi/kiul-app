import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface CoverPageRequest {
  title: string;
  authors: string;
  doi: string;
  abstract?: string;
  volume?: string;
  number?: string;
  year?: string;
  publishedDate?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CoverPageRequest = await req.json();
    const { title, authors, doi, abstract, volume, number, year, publishedDate } = body;

    // Validate required fields
    if (!title || !authors || !doi) {
      return NextResponse.json(
        { error: "Missing required fields: title, authors, doi" },
        { status: 400 }
      );
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points

    // Embed fonts
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    const { width, height } = page.getSize();
    const margin = 50;
    const contentWidth = width - 2 * margin;

    // Define colors
    const kiulGreen = rgb(0.08, 0.5, 0.24); // #15803d
    const darkGray = rgb(0.2, 0.2, 0.2);
    const mediumGray = rgb(0.4, 0.4, 0.4);

    let yPosition = height - margin;

    // Draw header background
    page.drawRectangle({
      x: 0,
      y: height - 120,
      width: width,
      height: 120,
      color: kiulGreen,
    });

    // Institution name
    page.drawText("KATOKI INSTITUTE FOR UBUNTU LEADERSHIP", {
      x: margin,
      y: height - 60,
      size: 18,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    page.drawText("Journal of Ubuntu Leadership Studies", {
      x: margin,
      y: height - 85,
      size: 14,
      font: regularFont,
      color: rgb(1, 1, 1),
    });

    // Issue information (if provided)
    if (volume && number && year) {
      page.drawText(`Volume ${volume}, Number ${number} (${year})`, {
        x: margin,
        y: height - 105,
        size: 11,
        font: regularFont,
        color: rgb(1, 1, 1),
      });
    }

    yPosition = height - 160;

    // Title
    const titleSize = 20;
    const titleLines = wrapText(title, contentWidth, titleSize, boldFont);
    
    for (const line of titleLines) {
      page.drawText(line, {
        x: margin,
        y: yPosition,
        size: titleSize,
        font: boldFont,
        color: darkGray,
      });
      yPosition -= titleSize + 8;
    }

    yPosition -= 15;

    // Authors
    page.drawText("Authors:", {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: mediumGray,
    });
    yPosition -= 20;

    const authorsLines = wrapText(authors, contentWidth, 12, regularFont);
    for (const line of authorsLines) {
      page.drawText(line, {
        x: margin,
        y: yPosition,
        size: 12,
        font: regularFont,
        color: darkGray,
      });
      yPosition -= 16;
    }

    yPosition -= 20;

    // DOI
    page.drawText("DOI:", {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: mediumGray,
    });
    yPosition -= 20;

    page.drawText(doi, {
      x: margin,
      y: yPosition,
      size: 11,
      font: regularFont,
      color: kiulGreen,
    });

    yPosition -= 25;

    // Published date
    if (publishedDate) {
      page.drawText("Published:", {
        x: margin,
        y: yPosition,
        size: 11,
        font: boldFont,
        color: mediumGray,
      });
      
      page.drawText(new Date(publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }), {
        x: margin + 70,
        y: yPosition,
        size: 11,
        font: regularFont,
        color: darkGray,
      });
      yPosition -= 30;
    }

    // Abstract (if provided)
    if (abstract) {
      yPosition -= 10;
      
      page.drawText("Abstract", {
        x: margin,
        y: yPosition,
        size: 14,
        font: boldFont,
        color: darkGray,
      });
      yPosition -= 25;

      const abstractLines = wrapText(abstract, contentWidth, 11, regularFont);
      const maxAbstractLines = 20; // Limit abstract to prevent overflow
      
      for (let i = 0; i < Math.min(abstractLines.length, maxAbstractLines); i++) {
        page.drawText(abstractLines[i], {
          x: margin,
          y: yPosition,
          size: 11,
          font: regularFont,
          color: darkGray,
        });
        yPosition -= 14;

        if (yPosition < 150) break; // Stop if we're too close to the footer
      }

      if (abstractLines.length > maxAbstractLines) {
        page.drawText("...", {
          x: margin,
          y: yPosition,
          size: 11,
          font: regularFont,
          color: darkGray,
        });
      }
    }

    // Footer
    const footerY = 60;
    
    page.drawLine({
      start: { x: margin, y: footerY + 25 },
      end: { x: width - margin, y: footerY + 25 },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText("© Katoki Institute for Ubuntu Leadership", {
      x: margin,
      y: footerY,
      size: 9,
      font: regularFont,
      color: mediumGray,
    });

    page.drawText("www.kiul.org", {
      x: width - margin - 70,
      y: footerY,
      size: 9,
      font: regularFont,
      color: kiulGreen,
    });

    // Save PDF
    const pdfBytes = await pdfDoc.save();

    // Return PDF
    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="cover-page-${doi.replace(/\//g, "-")}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating cover page:", error);
    return NextResponse.json(
      { error: "Failed to generate cover page" },
      { status: 500 }
    );
  }
}

// Helper function to wrap text
function wrapText(text: string, maxWidth: number, fontSize: number, font: any): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  // Approximate character width (this is a rough estimation)
  const charWidth = fontSize * 0.5;

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = testLine.length * charWidth;

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}
