"use server";

import { cookies } from "next/headers";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import type { ProfileWithTeam } from "@/app/_types/registration";

async function assertAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    throw new Error("Unauthorized");
  }
}

export async function getAllProfiles(): Promise<ProfileWithTeam[]> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*, team_members(team_id, role, team:teams(name))")
    .order("created_at", { ascending: false });

  if (!profiles) return [];

  return profiles.map((p) => {
    const membership = Array.isArray(p.team_members)
      ? p.team_members[0]
      : p.team_members;
    return {
      ...p,
      team_members: undefined,
      team_name: membership?.team?.name ?? null,
      team_id: membership?.team_id ?? null,
      team_role: membership?.role ?? null,
    } as ProfileWithTeam;
  });
}

export async function adminKickFromTeam(
  profileId: string,
): Promise<{ success: boolean; error?: string }> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();

  const { data: membership } = await supabase
    .from("team_members")
    .select("id, team_id, role")
    .eq("profile_id", profileId)
    .single();

  if (!membership) return { success: false, error: "Not on a team" };

  if (membership.role === "captain") {
    const { data: otherMembers } = await supabase
      .from("team_members")
      .select("id")
      .eq("team_id", membership.team_id)
      .neq("profile_id", profileId)
      .order("joined_at", { ascending: true })
      .limit(1);

    if (otherMembers && otherMembers.length > 0) {
      await supabase
        .from("team_members")
        .update({ role: "captain" })
        .eq("id", otherMembers[0].id);
    }
  }

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", membership.id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function adminDeleteProfile(
  profileId: string,
): Promise<{ success: boolean; error?: string }> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();

  // First kick from team if needed (handles captain transfer)
  const { data: membership } = await supabase
    .from("team_members")
    .select("id, team_id, role")
    .eq("profile_id", profileId)
    .single();

  if (membership) {
    if (membership.role === "captain") {
      const { data: otherMembers } = await supabase
        .from("team_members")
        .select("id")
        .eq("team_id", membership.team_id)
        .neq("profile_id", profileId)
        .order("joined_at", { ascending: true })
        .limit(1);

      if (otherMembers && otherMembers.length > 0) {
        await supabase
          .from("team_members")
          .update({ role: "captain" })
          .eq("id", otherMembers[0].id);
      }
    }
  }

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", profileId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
