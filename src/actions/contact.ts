"use server";

import { submitInquirySchema, ActionResult } from "@/lib/validation";
import { sendInquiryEmail } from "@/lib/email";

export async function submitInquiry(
  firstName: string,
  lastName: string,
  email: string,
  subject: string,
  message: string
): Promise<ActionResult> {
  const parsed = submitInquirySchema.safeParse({
    firstName,
    lastName,
    email,
    subject,
    message,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    await sendInquiryEmail(
      parsed.data.firstName,
      parsed.data.lastName,
      parsed.data.email,
      parsed.data.subject,
      parsed.data.message
    );
    
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[submitInquiry] error:", error);
    return { success: false, error: "Failed to send inquiry. Please try again later." };
  }
}
