"use server";

import { auth } from "@clerk/nextjs/server";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";

export interface UserTask {
  id: string;
  title: string;
  description: string;
  url: string;
  completed: boolean;
}

export async function getActiveTasks(): Promise<UserTask[]> {
  const { userId } = await auth();
  if (!userId) return [];

  const sb = getSupabaseSecretClient();

  // Get user profile
  const { data: profile } = await sb
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();

  if (!profile) return [];

  // Get active tasks
  const { data: tasks, error } = await sb
    .from("admin_tasks")
    .select("id, title, description, url")
    .eq("competition_year", 2026)
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error || !tasks) return [];

  // Get completions for this user
  const { data: completions } = await sb
    .from("task_completions")
    .select("task_id")
    .eq("profile_id", profile.id);

  const completedIds = new Set((completions ?? []).map((c) => c.task_id));

  return tasks.map((t) => ({
    ...t,
    completed: completedIds.has(t.id),
  }));
}

export async function completeTask(taskId: string): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const sb = getSupabaseSecretClient();

  const { data: profile } = await sb
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();

  if (!profile) throw new Error("Profile not found");

  const { error } = await sb.from("task_completions").upsert(
    { task_id: taskId, profile_id: profile.id },
    { onConflict: "task_id,profile_id" },
  );

  if (error) throw error;
}
