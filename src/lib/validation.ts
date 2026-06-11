import { z } from "zod";

// ─── Sanitization Helpers ───────────────────────────────────────────────────

/** Strip HTML tags to prevent XSS (OWASP A03) */
function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

/** Sanitized string: trimmed, HTML-stripped, with max length */
function sanitizedString(maxLength: number) {
  return z
    .string()
    .trim()
    .min(1, "This field is required")
    .max(maxLength, `Must be ${maxLength} characters or fewer`)
    .transform(stripHtml);
}

// ─── Date / Time Validators ─────────────────────────────────────────────────

const dateString = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format");

const timeString = z
  .string()
  .trim()
  .regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format");

// ─── ID Validators (OWASP A04 — prevent enumeration / injection via IDs) ──

const cuidString = z
  .string()
  .min(1, "ID is required")
  .max(50, "Invalid ID format");

// ─── Phone Number (OWASP A03 — restrict to safe characters) ────────────────

const phoneString = z
  .string()
  .trim()
  .min(7, "Phone number must be at least 7 characters")
  .max(20, "Phone number must be 20 characters or fewer")
  .regex(
    /^[0-9+\-\s()]+$/,
    "Phone number can only contain digits, +, -, spaces, and parentheses"
  );

// ─── Booking Schemas ────────────────────────────────────────────────────────

export const addSlotSchema = z.object({
  date: dateString,
  time: timeString,
});

export const removeSlotSchema = z.object({
  id: cuidString,
});

export const submitBookingSchema = z.object({
  slotId: cuidString,
  userName: sanitizedString(100),
  userEmail: z.string().email("Invalid email address"),
  userPhone: phoneString,
  sessionType: sanitizedString(100),
});

export const updateBookingStatusSchema = z.object({
  bookingId: cuidString,
  status: z.enum(["PENDING", "DONE", "FAIL", "CANCELLED"], {
    error: "Status must be PENDING, DONE, FAIL, or CANCELLED",
  }),
});

export const updateBookingDateSchema = z.object({
  bookingId: cuidString,
  newDate: sanitizedString(100),
  newTime: sanitizedString(50),
});

export const removeBookingSchema = z.object({
  id: cuidString,
});

// ─── Blog Schemas ───────────────────────────────────────────────────────────

const slugString = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(200, "Slug must be 200 characters or fewer")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase alphanumeric with hyphens"
  );

export const addBlogSchema = z.object({
  title: sanitizedString(300),
  slug: slugString,
  excerpt: sanitizedString(1000),
  content: z
    .array(sanitizedString(10000))
    .min(1, "At least one paragraph is required")
    .max(50, "Maximum 50 paragraphs"),
  author: sanitizedString(150),
  date: sanitizedString(100),
  readTime: sanitizedString(50),
  category: sanitizedString(100),
  image: sanitizedString(500),
});

export const removeBlogSchema = z.object({
  id: cuidString,
});

export const updateBlogSchema = addBlogSchema.extend({
  id: cuidString,
});

// ─── Video Schemas ──────────────────────────────────────────────────────────

export const addVideoSchema = z.object({
  title: sanitizedString(300),
  description: sanitizedString(2000),
  thumbnail: sanitizedString(500),
  videoUrl: sanitizedString(1000).optional(),
  duration: z
    .string()
    .trim()
    .min(1, "Duration is required")
    .max(20, "Duration must be 20 characters or fewer")
    .regex(/^[\d:]+$/, "Duration must be in format like 3:45"),
});

export const removeVideoSchema = z.object({
  id: cuidString,
});

export const updateVideoSchema = addVideoSchema.extend({
  id: cuidString,
});

// ─── Contact Inquiry Schemas ──────────────────────────────────────────────────

export const submitInquirySchema = z.object({
  firstName: sanitizedString(100),
  lastName: sanitizedString(100),
  email: z.string().email("Invalid email address"),
  subject: sanitizedString(200),
  message: sanitizedString(5000),
});

// ─── Action Result Type ─────────────────────────────────────────────────────

export type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string };
