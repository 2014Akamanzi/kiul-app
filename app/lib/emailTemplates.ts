// Email Templates for KIUL Journal Publishing System

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

// Acceptance Email Template
export const acceptanceEmail = (
  authorName: string,
  title: string,
  manuscriptId: string
): EmailTemplate => ({
  subject: "🎉 Manuscript Accepted – KIUL Publishing",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #15803d; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
        .title { font-weight: bold; color: #15803d; }
        .button { display: inline-block; background-color: #15803d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Katoki Institute for Ubuntu Leadership</h1>
          <p>Journal of Ubuntu Leadership Studies</p>
        </div>
        <div class="content">
          <p>Dear ${authorName},</p>
          
          <p>We are delighted to inform you that your manuscript has been <strong>accepted for publication</strong>!</p>
          
          <p class="title">Manuscript Title: ${title}</p>
          
          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>Your manuscript will now proceed to typesetting</li>
            <li>A DOI will be assigned to your article</li>
            <li>You will receive the final published version shortly</li>
            <li>Your work will be indexed and discoverable globally</li>
          </ul>
          
          <p>Congratulations on this achievement! Your contribution to Ubuntu scholarship is invaluable.</p>
          
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://kiul.org'}/author/dashboard" class="button">
            View Submission Status
          </a>
          
          <p style="margin-top: 30px;">
            Warm regards,<br>
            <strong>KIUL Editorial Board</strong><br>
            Katoki Institute for Ubuntu Leadership
          </p>
        </div>
        <div class="footer">
          <p>© 2025 Katoki Institute for Ubuntu Leadership. All rights reserved.</p>
          <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `Dear ${authorName},

We are delighted to inform you that your manuscript has been ACCEPTED for publication!

Manuscript Title: ${title}

Next Steps:
- Your manuscript will now proceed to typesetting
- A DOI will be assigned to your article
- You will receive the final published version shortly
- Your work will be indexed and discoverable globally

Congratulations on this achievement! Your contribution to Ubuntu scholarship is invaluable.

Visit your dashboard to view the status: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://kiul.org'}/author/dashboard

Warm regards,
KIUL Editorial Board
Katoki Institute for Ubuntu Leadership`,
});

// Revision Request Email Template
export const revisionEmail = (
  authorName: string,
  title: string,
  comments: string,
  manuscriptId: string,
  dueDate?: string
): EmailTemplate => ({
  subject: "✏️ Revision Request – KIUL Publishing",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #ea580c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
        .title { font-weight: bold; color: #ea580c; }
        .comments { background-color: white; padding: 15px; border-left: 4px solid #ea580c; margin: 20px 0; }
        .button { display: inline-block; background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Katoki Institute for Ubuntu Leadership</h1>
          <p>Journal of Ubuntu Leadership Studies</p>
        </div>
        <div class="content">
          <p>Dear ${authorName},</p>
          
          <p>Your manuscript has been reviewed, and we request <strong>revisions</strong> before it can proceed to publication.</p>
          
          <p class="title">Manuscript Title: ${title}</p>
          
          ${dueDate ? `<p><strong>Revision Due Date:</strong> ${new Date(dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>` : ''}
          
          <div class="comments">
            <strong>Reviewer Comments:</strong>
            <p>${comments.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p><strong>How to Submit Revisions:</strong></p>
          <ol>
            <li>Login to your Author Dashboard</li>
            <li>Locate this manuscript in your submissions</li>
            <li>Click "Submit Revised Manuscript"</li>
            <li>Upload your revised version</li>
            <li>Include a response letter addressing each comment</li>
          </ol>
          
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://kiul.org'}/author/dashboard" class="button">
            Submit Revised Manuscript
          </a>
          
          <p style="margin-top: 30px;">
            We look forward to receiving your revised submission.<br><br>
            Warm regards,<br>
            <strong>KIUL Editorial Board</strong><br>
            Katoki Institute for Ubuntu Leadership
          </p>
        </div>
        <div class="footer">
          <p>© 2025 Katoki Institute for Ubuntu Leadership. All rights reserved.</p>
          <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `Dear ${authorName},

Your manuscript has been reviewed, and we request REVISIONS before it can proceed to publication.

Manuscript Title: ${title}
${dueDate ? `\nRevision Due Date: ${new Date(dueDate).toLocaleDateString()}` : ''}

REVIEWER COMMENTS:
${comments}

How to Submit Revisions:
1. Login to your Author Dashboard
2. Locate this manuscript in your submissions
3. Click "Submit Revised Manuscript"
4. Upload your revised version
5. Include a response letter addressing each comment

Visit: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://kiul.org'}/author/dashboard

We look forward to receiving your revised submission.

Warm regards,
KIUL Editorial Board
Katoki Institute for Ubuntu Leadership`,
});

// Rejection Email Template
export const rejectionEmail = (
  authorName: string,
  title: string,
  reason?: string
): EmailTemplate => ({
  subject: "Decision on Your Submission – KIUL Publishing",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #6b7280; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
        .title { font-weight: bold; color: #6b7280; }
        .reason { background-color: white; padding: 15px; border-left: 4px solid #6b7280; margin: 20px 0; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Katoki Institute for Ubuntu Leadership</h1>
          <p>Journal of Ubuntu Leadership Studies</p>
        </div>
        <div class="content">
          <p>Dear ${authorName},</p>
          
          <p>Thank you for submitting your manuscript to the KIUL Journal of Ubuntu Leadership Studies.</p>
          
          <p class="title">Manuscript Title: ${title}</p>
          
          <p>After careful evaluation by our editorial board and peer reviewers, we regret to inform you that <strong>your manuscript will not be accepted for publication</strong> in our journal at this time.</p>
          
          ${reason ? `
          <div class="reason">
            <strong>Editorial Comments:</strong>
            <p>${reason.replace(/\n/g, '<br>')}</p>
          </div>
          ` : ''}
          
          <p>This decision does not diminish the value of your research. We encourage you to:</p>
          <ul>
            <li>Consider submitting to another journal that may be a better fit</li>
            <li>Revise your work based on feedback and resubmit elsewhere</li>
            <li>Continue your important contributions to Ubuntu scholarship</li>
          </ul>
          
          <p style="margin-top: 30px;">
            Thank you for considering KIUL for your scholarly work. We wish you success in your future research endeavors.<br><br>
            Warm regards,<br>
            <strong>KIUL Editorial Board</strong><br>
            Katoki Institute for Ubuntu Leadership
          </p>
        </div>
        <div class="footer">
          <p>© 2025 Katoki Institute for Ubuntu Leadership. All rights reserved.</p>
          <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `Dear ${authorName},

Thank you for submitting your manuscript to the KIUL Journal of Ubuntu Leadership Studies.

Manuscript Title: ${title}

After careful evaluation by our editorial board and peer reviewers, we regret to inform you that your manuscript will not be accepted for publication in our journal at this time.

${reason ? `\nEditorial Comments:\n${reason}\n` : ''}

This decision does not diminish the value of your research. We encourage you to:
- Consider submitting to another journal that may be a better fit
- Revise your work based on feedback and resubmit elsewhere
- Continue your important contributions to Ubuntu scholarship

Thank you for considering KIUL for your scholarly work. We wish you success in your future research endeavors.

Warm regards,
KIUL Editorial Board
Katoki Institute for Ubuntu Leadership`,
});

// Submission Confirmation Email
export const submissionConfirmationEmail = (
  authorName: string,
  title: string,
  manuscriptId: string
): EmailTemplate => ({
  subject: "✅ Submission Received – KIUL Publishing",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
        .title { font-weight: bold; color: #2563eb; }
        .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Katoki Institute for Ubuntu Leadership</h1>
          <p>Journal of Ubuntu Leadership Studies</p>
        </div>
        <div class="content">
          <p>Dear ${authorName},</p>
          
          <p>Thank you for submitting your manuscript to the KIUL Journal of Ubuntu Leadership Studies.</p>
          
          <p class="title">Manuscript Title: ${title}</p>
          <p><strong>Submission ID:</strong> ${manuscriptId}</p>
          
          <p><strong>What happens next:</strong></p>
          <ol>
            <li><strong>Initial Review</strong> - Our editorial team will conduct a preliminary review</li>
            <li><strong>Peer Review</strong> - Your manuscript will be sent to expert reviewers</li>
            <li><strong>Decision</strong> - You will receive notification of the decision</li>
            <li><strong>Publication</strong> - If accepted, your work will be published with a DOI</li>
          </ol>
          
          <p>You can track the status of your submission through your Author Dashboard.</p>
          
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://kiul.org'}/author/dashboard" class="button">
            Track Submission Status
          </a>
          
          <p style="margin-top: 30px;">
            Warm regards,<br>
            <strong>KIUL Editorial Board</strong><br>
            Katoki Institute for Ubuntu Leadership
          </p>
        </div>
        <div class="footer">
          <p>© 2025 Katoki Institute for Ubuntu Leadership. All rights reserved.</p>
          <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `Dear ${authorName},

Thank you for submitting your manuscript to the KIUL Journal of Ubuntu Leadership Studies.

Manuscript Title: ${title}
Submission ID: ${manuscriptId}

What happens next:
1. Initial Review - Our editorial team will conduct a preliminary review
2. Peer Review - Your manuscript will be sent to expert reviewers
3. Decision - You will receive notification of the decision
4. Publication - If accepted, your work will be published with a DOI

You can track the status of your submission through your Author Dashboard:
${process.env.NEXT_PUBLIC_BASE_URL || 'https://kiul.org'}/author/dashboard

Warm regards,
KIUL Editorial Board
Katoki Institute for Ubuntu Leadership`,
});

// DOI Registration Confirmation Email
export const doiRegistrationEmail = (
  authorName: string,
  title: string,
  doi: string,
  pdfUrl: string
): EmailTemplate => ({
  subject: "🎓 Your Article DOI Has Been Registered – KIUL Publishing",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #7c3aed; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
        .title { font-weight: bold; color: #7c3aed; }
        .doi-box { background-color: white; padding: 20px; border: 2px solid #7c3aed; border-radius: 8px; margin: 20px 0; text-align: center; }
        .button { display: inline-block; background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Katoki Institute for Ubuntu Leadership</h1>
          <p>Journal of Ubuntu Leadership Studies</p>
        </div>
        <div class="content">
          <p>Dear ${authorName},</p>
          
          <p>Great news! Your article has been officially registered with CrossRef and assigned a Digital Object Identifier (DOI).</p>
          
          <p class="title">Article Title: ${title}</p>
          
          <div class="doi-box">
            <strong>Your DOI:</strong><br>
            <a href="https://doi.org/${doi}" style="color: #7c3aed; font-size: 18px; text-decoration: none;">
              ${doi}
            </a>
          </div>
          
          <p><strong>What this means:</strong></p>
          <ul>
            <li>Your article is now permanently citable</li>
            <li>It will be indexed in major academic databases</li>
            <li>The DOI provides a persistent link to your work</li>
            <li>Your research is discoverable globally</li>
          </ul>
          
          <p><strong>Cite your article as:</strong></p>
          <p style="background-color: white; padding: 15px; border-left: 4px solid #7c3aed; font-style: italic;">
            ${authorName}. (${new Date().getFullYear()}). ${title}. <em>KIUL Journal of Ubuntu Leadership Studies</em>. https://doi.org/${doi}
          </p>
          
          <div style="text-align: center;">
            <a href="https://doi.org/${doi}" class="button">View Published Article</a>
            <a href="${pdfUrl}" class="button">Download PDF</a>
          </div>
          
          <p style="margin-top: 30px;">
            Congratulations on your publication!<br><br>
            Warm regards,<br>
            <strong>KIUL Editorial Board</strong><br>
            Katoki Institute for Ubuntu Leadership
          </p>
        </div>
        <div class="footer">
          <p>© 2025 Katoki Institute for Ubuntu Leadership. All rights reserved.</p>
          <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `Dear ${authorName},

Great news! Your article has been officially registered with CrossRef and assigned a Digital Object Identifier (DOI).

Article Title: ${title}

Your DOI: ${doi}
View at: https://doi.org/${doi}

What this means:
- Your article is now permanently citable
- It will be indexed in major academic databases
- The DOI provides a persistent link to your work
- Your research is discoverable globally

Cite your article as:
${authorName}. (${new Date().getFullYear()}). ${title}. KIUL Journal of Ubuntu Leadership Studies. https://doi.org/${doi}

View Published Article: https://doi.org/${doi}
Download PDF: ${pdfUrl}

Congratulations on your publication!

Warm regards,
KIUL Editorial Board
Katoki Institute for Ubuntu Leadership`,
});
