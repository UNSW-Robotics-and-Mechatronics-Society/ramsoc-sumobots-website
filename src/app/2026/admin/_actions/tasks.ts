"use server";

import { cookies } from "next/headers";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";

interface AdminTask {
  id: string;
  title: string;
  description: string;
  url: string;
  active: boolean;
  created_at: string;
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    throw new Error("Unauthorized");
  }
}

export async function getAllTasks(): Promise<AdminTask[]> {
  await requireAdmin();
  const sb = getSupabaseSecretClient();
  const { data, error } = await sb
    .from("admin_tasks")
    .select("*")
    .eq("competition_year", 2026)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createTask(
  title: string,
  description: string,
  url: string,
): Promise<void> {
  await requireAdmin();
  const sb = getSupabaseSecretClient();
  const { error } = await sb.from("admin_tasks").insert({
    title,
    description,
    url,
    competition_year: 2026,
  });
  if (error) throw error;
}

export async function updateTask(
  taskId: string,
  fields: { title?: string; description?: string; url?: string; active?: boolean },
): Promise<void> {
  await requireAdmin();
  const sb = getSupabaseSecretClient();
  const { error } = await sb
    .from("admin_tasks")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", taskId);
  if (error) throw error;
}

export async function deleteTask(taskId: string): Promise<void> {
  await requireAdmin();
  const sb = getSupabaseSecretClient();
  const { error } = await sb.from("admin_tasks").delete().eq("id", taskId);
  if (error) throw error;
}
