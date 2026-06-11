"use server";

import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "wicare_admin_session";

export async function loginAdmin(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  if (!correctPassword) {
    return { success: false, error: "Server configuration error: Admin password not set" };
  }

  if (password === correctPassword) {
    // Generate a secure session token (for simplicity, using the password hash, or a fixed value)
    // We will just store the password in the cookie, but HTTP-only and Secure so it's safe from XSS.
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, correctPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return { success: true };
  }
  
  return { success: false, error: "Incorrect password" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return { success: true };
}

export async function verifyAdmin() {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword) return false;
  
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  
  return adminCookie?.value === correctPassword;
}
