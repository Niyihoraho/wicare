"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  sendBookingConfirmation,
  sendBookingCancelled,
  sendBookingRescheduled,
  sendBookingCompleted,
} from "@/lib/email";
import {
  addSlotSchema,
  removeSlotSchema,
  submitBookingSchema,
  updateBookingStatusSchema,
  updateBookingDateSchema,
  removeBookingSchema,
  type ActionResult,
} from "@/lib/validation";

// ─── Types (re-exported for client components) ──────────────────────────────

export type Slot = {
  id: string;
  date: string;
  time: string;
};

export type Booking = {
  id: string;
  slotId: string;
  date: string;
  time: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  sessionType: string;
  status: "PENDING" | "DONE" | "FAIL" | "CANCELLED";
  createdAt: string;
};

// ─── Read ───────────────────────────────────────────────────────────────────

export async function getBookingData(): Promise<{
  availableSlots: Slot[];
  bookings: Booking[];
}> {
  try {
    const [slots, bookings] = await Promise.all([
      prisma.availableSlot.findMany({ orderBy: { date: "asc" } }),
      prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    return {
      availableSlots: slots.map((s) => ({
        id: s.id,
        date: s.date,
        time: s.time,
      })),
      bookings: bookings.map((b) => ({
        id: b.id,
        slotId: b.slotId,
        date: b.date,
        time: b.time,
        userName: b.userName,
        userEmail: b.userEmail,
        userPhone: b.userPhone,
        sessionType: b.sessionType,
        status: b.status,
        createdAt: b.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("[getBookingData] Database error:", error);
    return { availableSlots: [], bookings: [] };
  }
}

// ─── Add Available Slot ─────────────────────────────────────────────────────

export async function addAvailableSlot(
  date: string,
  time: string
): Promise<ActionResult<Slot>> {
  const parsed = addSlotSchema.safeParse({ date, time });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const slot = await prisma.availableSlot.create({
      data: { date: parsed.data.date, time: parsed.data.time },
    });

    revalidatePath("/admin/booking");
    revalidatePath("/book-session");

    return {
      success: true,
      data: { id: slot.id, date: slot.date, time: slot.time },
    };
  } catch (error) {
    console.error("[addAvailableSlot] Database error:", error);
    return { success: false, error: "Failed to add slot. Please try again." };
  }
}

// ─── Remove Available Slot ──────────────────────────────────────────────────

export async function removeAvailableSlot(
  id: string
): Promise<ActionResult> {
  const parsed = removeSlotSchema.safeParse({ id });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    await prisma.availableSlot.delete({ where: { id: parsed.data.id } });

    revalidatePath("/admin/booking");
    revalidatePath("/book-session");

    return { success: true, data: undefined };
  } catch (error) {
    console.error("[removeAvailableSlot] Database error:", error);
    return { success: false, error: "Failed to remove slot." };
  }
}

// ─── Update Booking Status ──────────────────────────────────────────────────

export async function updateBookingStatus(
  bookingId: string,
  status: "PENDING" | "DONE" | "FAIL" | "CANCELLED"
): Promise<ActionResult> {
  const parsed = updateBookingStatusSchema.safeParse({ bookingId, status });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: parsed.data.bookingId },
    });

    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    await prisma.booking.update({
      where: { id: parsed.data.bookingId },
      data: { status: parsed.data.status },
    });

    // Send emails based on status
    if (parsed.data.status === "CANCELLED") {
      await sendBookingCancelled(booking.userEmail, booking.userName, booking.date, booking.time);
    } else if (parsed.data.status === "DONE") {
      await sendBookingCompleted(booking.userEmail, booking.userName);
    }

    revalidatePath("/admin/booking");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[updateBookingStatus] Database error:", error);
    return { success: false, error: "Failed to update status." };
  }
}

// ─── Remove Booking ─────────────────────────────────────────────────────────

export async function removeBooking(id: string): Promise<ActionResult> {
  const parsed = removeBookingSchema.safeParse({ id });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    await prisma.booking.delete({
      where: { id: parsed.data.id },
    });

    revalidatePath("/admin/booking");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[removeBooking] Database error:", error);
    return { success: false, error: "Failed to remove booking." };
  }
}

// ─── Update Booking Date ────────────────────────────────────────────────────

export async function updateBookingDate(
  bookingId: string,
  newDate: string,
  newTime: string
): Promise<ActionResult> {
  const parsed = updateBookingDateSchema.safeParse({
    bookingId,
    newDate,
    newTime,
  });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: parsed.data.bookingId },
    });

    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    await prisma.booking.update({
      where: { id: parsed.data.bookingId },
      data: { date: parsed.data.newDate, time: parsed.data.newTime },
    });

    await sendBookingRescheduled(
      booking.userEmail, 
      booking.userName, 
      booking.date, 
      booking.time, 
      parsed.data.newDate, 
      parsed.data.newTime
    );

    revalidatePath("/admin/booking");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[updateBookingDate] Database error:", error);
    return { success: false, error: "Failed to update booking date." };
  }
}

// ─── Submit Booking (User-facing — uses Prisma transaction) ─────────────────

export async function submitBooking(
  slotId: string,
  userName: string,
  userEmail: string,
  userPhone: string,
  sessionType: string
): Promise<ActionResult<Booking>> {
  const parsed = submitBookingSchema.safeParse({
    slotId,
    userName,
    userEmail,
    userPhone,
    sessionType,
  });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    // Use a transaction to atomically remove the slot and create the booking
    const booking = await prisma.$transaction(async (tx) => {
      // Find and verify the slot exists
      const slot = await tx.availableSlot.findUnique({
        where: { id: parsed.data.slotId },
      });

      if (!slot) {
        throw new Error("SLOT_NOT_AVAILABLE");
      }

      // Remove the slot so nobody else can book it
      await tx.availableSlot.delete({ where: { id: slot.id } });

      // Create the booking
      return tx.booking.create({
        data: {
          slotId: slot.id,
          date: slot.date,
          time: slot.time,
          userName: parsed.data.userName,
          userEmail: parsed.data.userEmail,
          userPhone: parsed.data.userPhone,
          sessionType: parsed.data.sessionType,
          status: "PENDING",
        },
      });
    });

    await sendBookingConfirmation(
      booking.userEmail,
      booking.userName,
      booking.date,
      booking.time,
      booking.sessionType
    );

    revalidatePath("/admin/booking");
    revalidatePath("/book-session");

    return {
      success: true,
      data: {
        id: booking.id,
        slotId: booking.slotId,
        date: booking.date,
        time: booking.time,
        userName: booking.userName,
        userEmail: booking.userEmail,
        userPhone: booking.userPhone,
        sessionType: booking.sessionType,
        status: booking.status,
        createdAt: booking.createdAt.toISOString(),
      },
    };
  } catch (error) {
    if (error instanceof Error && error.message === "SLOT_NOT_AVAILABLE") {
      return {
        success: false,
        error: "This slot is no longer available. Please select another.",
      };
    }
    console.error("[submitBooking] Database error:", error);
    return {
      success: false,
      error: "Failed to book slot. Please try again.",
    };
  }
}
