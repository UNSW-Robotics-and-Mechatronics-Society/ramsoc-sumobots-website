"use server";

import { cookies } from "next/headers";

export async function adminLogin(
  password: string,
): Promise<{ success: boolean; error?: string }> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return { success: false, error: "Admin access not configured" };
  }

  if (password !== adminPassword) {
    return { success: false, error: "Invalid password" };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    path: "/2026/admin",
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: "lax",
  });

  return { success: true };
}

export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: "admin_session",
    path: "/2026/admin",
  });
}
