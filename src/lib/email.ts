import nodemailer from "nodemailer";

// Initialize the Nodemailer transport using the environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// The "From" address for all emails
const FROM_EMAIL = process.env.SMTP_FROM || `"Wicare Bookings" <${process.env.SMTP_USER}>`;

// The base URL for logo loading. In production, set NEXT_PUBLIC_APP_URL.
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://wicare.rw";

// A reusable email wrapper to enforce the brand design pattern
function generateEmailHtml(title: string, contentHtml: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #faf9f6; font-family: 'Arial', sans-serif; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #faf9f6; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border: 1px solid #f1f5f9;">
              
              <!-- Brand Header -->
              <tr>
                <td align="center" style="background-color: #0f172a; padding: 32px 20px; border-bottom: 4px solid #c9a84c;">
                  <h1 style="color: #faf9f6; margin: 0; font-size: 28px; letter-spacing: 1px;">WiCare</h1>
                  <p style="color: #c9a84c; margin: 4px 0 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Neurofeedback Center</p>
                </td>
              </tr>
              
              <!-- Content Area -->
              <tr>
                <td style="padding: 40px; color: #334155; font-size: 16px; line-height: 1.6;">
                  ${contentHtml}
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 32px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #0f172a; font-weight: 600; font-size: 16px;">Wicare Neurofeedback Center</p>
                  <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Kigali, Rwanda</p>
                  <p style="margin: 24px 0 0 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">This is an automated message. Please do not reply directly to this email unless stated otherwise.</p>
                </td>
              </tr>

            </table>
            
            <!-- Safe spacer for bottom padding in some clients -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr><td height="40"></td></tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function sendBookingConfirmation(email: string, name: string, date: string, time: string, sessionType: string) {
  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: `Booking Confirmed - ${sessionType}`,
      html: generateEmailHtml(
        `Booking Confirmed!`,
        `
          <h2 style="color: #0f172a; margin-top: 0;">Booking Confirmed!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for booking a session with us. Your appointment for <strong>${sessionType}</strong> is confirmed.</p>
          
          <div style="background-color: #faf9f6; border-left: 4px solid #c9a84c; padding: 20px; border-radius: 4px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 0;"><strong>Time:</strong> ${time}</p>
          </div>
          
          <p>We look forward to speaking with you and beginning your journey to optimal mental wellness.</p>
          <br/>
          <p style="margin: 0; color: #64748b;">Best regards,</p>
          <p style="margin: 4px 0 0 0; color: #0f172a; font-weight: 600;">The Wicare Team</p>
        `
      ),
    });
    console.log("Confirmation Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

export async function sendBookingCancelled(email: string, name: string, date: string, time: string) {
  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "Booking Cancelled",
      html: generateEmailHtml(
        `Booking Cancelled`,
        `
          <h2 style="color: #b91c1c; margin-top: 0;">Booking Cancelled</h2>
          <p>Dear ${name},</p>
          <p>Your appointment scheduled for <strong>${date}</strong> at <strong>${time}</strong> has been cancelled.</p>
          <p>If you have any questions or wish to reschedule, please feel free to reach out to us at any time.</p>
          <br/>
          <p style="margin: 0; color: #64748b;">Best regards,</p>
          <p style="margin: 4px 0 0 0; color: #0f172a; font-weight: 600;">The Wicare Team</p>
        `
      ),
    });
    console.log("Cancellation Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending cancellation email:", error);
  }
}

export async function sendBookingRescheduled(email: string, name: string, oldDate: string, oldTime: string, newDate: string, newTime: string) {
  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "Booking Rescheduled",
      html: generateEmailHtml(
        `Booking Rescheduled`,
        `
          <h2 style="color: #0f172a; margin-top: 0;">Booking Rescheduled</h2>
          <p>Dear ${name},</p>
          <p>Your appointment has been successfully rescheduled.</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0; text-decoration: line-through; color: #64748b;">Previous: ${oldDate} at ${oldTime}</p>
            <p style="margin: 12px 0 0 0; color: #166534; font-weight: bold; font-size: 18px;">New Time: ${newDate} at ${newTime}</p>
          </div>
          
          <p>We look forward to seeing you at your new scheduled time!</p>
          <br/>
          <p style="margin: 0; color: #64748b;">Best regards,</p>
          <p style="margin: 4px 0 0 0; color: #0f172a; font-weight: 600;">The Wicare Team</p>
        `
      ),
    });
    console.log("Reschedule Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending reschedule email:", error);
  }
}

export async function sendBookingCompleted(email: string, name: string) {
  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "Thank you for your session!",
      html: generateEmailHtml(
        `Thank You!`,
        `
          <h2 style="color: #0f172a; margin-top: 0;">Thank You!</h2>
          <p>Dear ${name},</p>
          <p>Thank you so much for working with us! We truly hope you found the session valuable and insightful.</p>
          <p>If you enjoyed your experience, we would love to hear your feedback. Your journey to optimal wellness is important to us.</p>
          <p>Looking forward to working with you again in the future!</p>
          <br/>
          <p style="margin: 0; color: #64748b;">Best regards,</p>
          <p style="margin: 4px 0 0 0; color: #0f172a; font-weight: 600;">The Wicare Team</p>
        `
      ),
    });
    console.log("Completed/Thank You Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending completed email:", error);
  }
}

export async function sendInquiryEmail(firstName: string, lastName: string, email: string, subject: string, message: string) {
  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: process.env.SMTP_USER, // Send TO the site owner
      replyTo: email, // Set reply-to to the submitter's email
      subject: `New Inquiry: ${subject}`,
      html: generateEmailHtml(
        `New Website Inquiry`,
        `
          <h2 style="color: #0f172a; margin-top: 0;">New Website Inquiry</h2>
          <p style="color: #64748b; margin-bottom: 24px;">You have received a new message from the website contact form.</p>
          
          <div style="background-color: #faf9f6; border-left: 4px solid #c9a84c; padding: 20px; border-radius: 4px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0f172a;">${email}</a></p>
            <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <h3 style="color: #0f172a; margin: 24px 0 12px 0; font-size: 16px;">Message:</h3>
          <div style="background-color: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; white-space: pre-wrap; color: #334155; line-height: 1.7;">${message}</div>
          
          <p style="margin-top: 32px; font-size: 14px; color: #94a3b8;"><em>Reply directly to this email to respond to ${firstName}.</em></p>
        `
      ),
    });
    console.log("Inquiry Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending inquiry email:", error);
  }
}
