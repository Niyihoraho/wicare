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

export async function sendBookingConfirmation(email: string, name: string, date: string, time: string, sessionType: string) {
  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: `Booking Confirmed - ${sessionType}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-w-2xl mx-auto p-4 border rounded shadow-sm">
          <h2 style="color: #0f172a;">Booking Confirmed!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for booking a session with us. Your appointment for <strong>${sessionType}</strong> is confirmed.</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 0;"><strong>Time:</strong> ${time}</p>
          </div>
          <p>We look forward to speaking with you!</p>
          <br/>
          <p style="font-size: 0.9em; color: #64748b;">Best regards,<br/>The Wicare Team</p>
        </div>
      `,
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
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-w-2xl mx-auto p-4 border rounded shadow-sm">
          <h2 style="color: #b91c1c;">Booking Cancelled</h2>
          <p>Dear ${name},</p>
          <p>Your appointment scheduled for <strong>${date}</strong> at <strong>${time}</strong> has been cancelled.</p>
          <p>If you have any questions or wish to reschedule, please contact us.</p>
          <br/>
          <p style="font-size: 0.9em; color: #64748b;">Best regards,<br/>The Wicare Team</p>
        </div>
      `,
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
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-w-2xl mx-auto p-4 border rounded shadow-sm">
          <h2 style="color: #0f172a;">Booking Rescheduled</h2>
          <p>Dear ${name},</p>
          <p>Your appointment has been successfully rescheduled.</p>
          <div style="background-color: #fef3c7; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 0; text-decoration: line-through; color: #92400e;">Previous time: ${oldDate} at ${oldTime}</p>
            <p style="margin: 8px 0 0 0; color: #065f46; font-weight: bold;">New time: ${newDate} at ${newTime}</p>
          </div>
          <p>We look forward to speaking with you!</p>
          <br/>
          <p style="font-size: 0.9em; color: #64748b;">Best regards,<br/>The Wicare Team</p>
        </div>
      `,
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
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-w-2xl mx-auto p-4 border rounded shadow-sm">
          <h2 style="color: #0f172a;">Thank You!</h2>
          <p>Dear ${name},</p>
          <p>Thank you so much for working with us! We hope you found the session valuable.</p>
          <p>If you enjoyed your experience, we would love to hear your feedback.</p>
          <p>Looking forward to working with you again in the future!</p>
          <br/>
          <p style="font-size: 0.9em; color: #64748b;">Best regards,<br/>The Wicare Team</p>
        </div>
      `,
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
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-w-2xl mx-auto p-4 border rounded shadow-sm">
          <h2 style="color: #0f172a;">New Website Inquiry</h2>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 0;"><strong>From:</strong> ${firstName} ${lastName} (<a href="mailto:${email}">${email}</a>)</p>
            <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          <h3 style="color: #0f172a; margin-top: 24px;">Message:</h3>
          <div style="background-color: #ffffff; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; white-space: pre-wrap;">
            ${message}
          </div>
        </div>
      `,
    });
    console.log("Inquiry Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending inquiry email:", error);
  }
}
