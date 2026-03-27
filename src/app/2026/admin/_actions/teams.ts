"use server";

import { cookies } from "next/headers";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import type { AdminTeamRow, TeamWithMembers } from "@/app/_types/registration";

async function assertAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    throw new Error("Unauthorized");
  }
}

export async function getAllTeams(): Promise<AdminTeamRow[]> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();

  const { data: teams } = await supabase
    .from("teams")
    .select("*, team_members(id, profile:profiles(full_name))")
    .eq("competition_year", 2026)
    .order("created_at", { ascending: false });

  if (!teams) return [];

  return teams.map((t) => {
    const members = Array.isArray(t.team_members) ? t.team_members : [];
    return {
      ...t,
      team_members: undefined,
      member_count: members.length,
      member_names: members.map(
        (m: { profile: { full_name: string } }) => m.profile.full_name,
      ),
    } as AdminTeamRow;
  });
}

export async function getTeamDetail(
  teamId: string,
): Promise<TeamWithMembers | null> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();

  const { data: team } = await supabase
    .from("teams")
    .select("*")
    .eq("id", teamId)
    .single();

  if (!team) return null;

  const { data: members } = await supabase
    .from("team_members")
    .select("*, profile:profiles(*)")
    .eq("team_id", team.id)
    .order("joined_at", { ascending: true });

  return { ...team, members: members ?? [] } as TeamWithMembers;
}

export async function updateTeamPaid(
  teamId: string,
  paid: boolean,
): Promise<{ success: boolean; error?: string }> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();

  const { error } = await supabase
    .from("teams")
    .update({ paid })
    .eq("id", teamId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateTeamName(
  teamId: string,
  name: string,
): Promise<{ success: boolean; error?: string }> {
  await assertAdmin();
  if (!name.trim()) return { success: false, error: "Name is required" };

  const supabase = getSupabaseSecretClient();
  const { error } = await supabase
    .from("teams")
    .update({ name: name.trim() })
    .eq("id", teamId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function transferCaptain(
  teamId: string,
  newCaptainProfileId: string,
): Promise<{ success: boolean; error?: string }> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();

  // Demote current captain
  const { error: demoteError } = await supabase
    .from("team_members")
    .update({ role: "member" })
    .eq("team_id", teamId)
    .eq("role", "captain");

  if (demoteError) return { success: false, error: demoteError.message };

  // Promote new captain
  const { error: promoteError } = await supabase
    .from("team_members")
    .update({ role: "captain" })
    .eq("team_id", teamId)
    .eq("profile_id", newCaptainProfileId);

  if (promoteError) return { success: false, error: promoteError.message };
  return { success: true };
}

export async function adminRemoveMember(
  teamId: string,
  profileId: string,
): Promise<{ success: boolean; error?: string }> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();

  // Check if this member is the captain
  const { data: membership } = await supabase
    .from("team_members")
    .select("id, role")
    .eq("team_id", teamId)
    .eq("profile_id", profileId)
    .single();

  if (!membership) return { success: false, error: "Member not found" };

  if (membership.role === "captain") {
    // Find next member to promote
    const { data: otherMembers } = await supabase
      .from("team_members")
      .select("id")
      .eq("team_id", teamId)
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

export async function adminDeleteTeam(
  teamId: string,
): Promise<{ success: boolean; error?: string }> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();

  const { error } = await supabase.from("teams").delete().eq("id", teamId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
