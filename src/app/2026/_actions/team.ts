"use server";

import { auth } from "@clerk/nextjs/server";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import type { TeamWithMembers, TeamBrowseItem } from "@/app/_types/registration";

const JOIN_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O/0/I/1

function generateJoinCode(): string {
  const array = new Uint8Array(6);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => JOIN_CODE_CHARS[b % JOIN_CODE_CHARS.length])
    .join("");
}

const MEMBER_LIMITS = {
  standard: { min: 3, max: 6 },
  open: { min: 1, max: 6 },
} as const;

async function getProfileId(userId: string) {
  const supabase = getSupabaseSecretClient();
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();
  return data?.id as string | undefined;
}

export async function createTeam(input: {
  name: string;
  category: "standard" | "open";
}): Promise<{ success: boolean; join_code?: string; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  if (!input.name.trim()) {
    return { success: false, error: "Team name is required" };
  }

  if (!["standard", "open"].includes(input.category)) {
    return { success: false, error: "Invalid category" };
  }

  const profileId = await getProfileId(userId);
  if (!profileId) return { success: false, error: "Profile not found" };

  // Check if user is already on a team
  const supabase = getSupabaseSecretClient();
  const { data: existingMembership } = await supabase
    .from("team_members")
    .select("id")
    .eq("profile_id", profileId)
    .limit(1)
    .single();

  if (existingMembership) {
    return { success: false, error: "You are already on a team" };
  }

  // Generate unique join code with retry
  let joinCode = generateJoinCode();
  for (let i = 0; i < 5; i++) {
    const { data: existing } = await supabase
      .from("teams")
      .select("id")
      .eq("join_code", joinCode)
      .single();
    if (!existing) break;
    joinCode = generateJoinCode();
  }

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .insert({
      name: input.name.trim(),
      category: input.category,
      join_code: joinCode,
      competition_year: 2026,
      created_by: profileId,
    })
    .select("id, join_code")
    .single();

  if (teamError || !team) {
    console.error("Failed to create team:", teamError);
    return { success: false, error: "Failed to create team" };
  }

  // Add creator as captain
  const { error: memberError } = await supabase.from("team_members").insert({
    team_id: team.id,
    profile_id: profileId,
    role: "captain",
  });

  if (memberError) {
    // Rollback team creation
    await supabase.from("teams").delete().eq("id", team.id);
    console.error("Failed to add captain:", memberError);
    return { success: false, error: "Failed to create team" };
  }

  return { success: true, join_code: team.join_code };
}

export async function previewTeam(
  joinCode: string,
): Promise<{
  success: boolean;
  team?: { name: string; category: string; member_count: number };
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  const code = joinCode.trim().toUpperCase();
  if (code.length !== 6) {
    return { success: false, error: "Join code must be 6 characters" };
  }

  const supabase = getSupabaseSecretClient();
  const { data: team } = await supabase
    .from("teams")
    .select("id, name, category")
    .eq("join_code", code)
    .eq("competition_year", 2026)
    .single();

  if (!team) {
    return { success: false, error: "Invalid join code" };
  }

  const { count } = await supabase
    .from("team_members")
    .select("id", { count: "exact", head: true })
    .eq("team_id", team.id);

  return {
    success: true,
    team: {
      name: team.name,
      category: team.category,
      member_count: count ?? 0,
    },
  };
}

export async function joinTeam(
  joinCode: string,
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  const code = joinCode.trim().toUpperCase();
  if (code.length !== 6) {
    return { success: false, error: "Join code must be 6 characters" };
  }

  const profileId = await getProfileId(userId);
  if (!profileId) return { success: false, error: "Profile not found" };

  const supabase = getSupabaseSecretClient();

  // Check if already on a team
  const { data: existingMembership } = await supabase
    .from("team_members")
    .select("id")
    .eq("profile_id", profileId)
    .limit(1)
    .single();

  if (existingMembership) {
    return { success: false, error: "You are already on a team" };
  }

  // Find team
  const { data: team } = await supabase
    .from("teams")
    .select("id, category")
    .eq("join_code", code)
    .eq("competition_year", 2026)
    .single();

  if (!team) {
    return { success: false, error: "Invalid join code" };
  }

  // Check member limit
  const { count } = await supabase
    .from("team_members")
    .select("id", { count: "exact", head: true })
    .eq("team_id", team.id);

  const limit = MEMBER_LIMITS[team.category as keyof typeof MEMBER_LIMITS];
  if ((count ?? 0) >= limit.max) {
    return { success: false, error: "This team is full" };
  }

  const { error } = await supabase.from("team_members").insert({
    team_id: team.id,
    profile_id: profileId,
    role: "member",
  });

  if (error) {
    console.error("Failed to join team:", error);
    return { success: false, error: "Failed to join team" };
  }

  return { success: true };
}

export async function leaveTeam(): Promise<{
  success: boolean;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  const profileId = await getProfileId(userId);
  if (!profileId) return { success: false, error: "Profile not found" };

  const supabase = getSupabaseSecretClient();

  // Find membership
  const { data: membership } = await supabase
    .from("team_members")
    .select("id, team_id, role")
    .eq("profile_id", profileId)
    .limit(1)
    .single();

  if (!membership) {
    return { success: false, error: "You are not on a team" };
  }

  if (membership.role === "captain") {
    // Check if there are other members
    const { data: otherMembers } = await supabase
      .from("team_members")
      .select("id, profile_id, joined_at")
      .eq("team_id", membership.team_id)
      .neq("profile_id", profileId)
      .order("joined_at", { ascending: true });

    if (otherMembers && otherMembers.length > 0) {
      // Promote earliest member to captain
      const { error: promoteError } = await supabase
        .from("team_members")
        .update({ role: "captain" })
        .eq("id", otherMembers[0].id);

      if (promoteError) {
        console.error("Failed to promote new captain:", promoteError);
        return { success: false, error: "Failed to leave team" };
      }
    } else {
      // Solo captain — delete the team (CASCADE cleans up team_members)
      const { error: deleteError } = await supabase
        .from("teams")
        .delete()
        .eq("id", membership.team_id);

      if (deleteError) {
        console.error("Failed to delete team:", deleteError);
        return { success: false, error: "Failed to leave team" };
      }
      return { success: true };
    }
  }

  // Remove member row
  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", membership.id);

  if (error) {
    console.error("Failed to leave team:", error);
    return { success: false, error: "Failed to leave team" };
  }

  return { success: true };
}

export async function browseTeams(): Promise<TeamBrowseItem[]> {
  const supabase = getSupabaseSecretClient();

  const { data: teams } = await supabase
    .from("teams")
    .select("name, category, team_members(id)")
    .eq("competition_year", 2026)
    .order("name", { ascending: true });

  if (!teams) return [];

  return teams.map((t) => ({
    name: t.name,
    category: t.category as "standard" | "open",
    member_count: Array.isArray(t.team_members) ? t.team_members.length : 0,
  }));
}

export async function getMyTeam(): Promise<TeamWithMembers | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const profileId = await getProfileId(userId);
  if (!profileId) return null;

  const supabase = getSupabaseSecretClient();

  // Find team membership
  const { data: membership } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("profile_id", profileId)
    .limit(1)
    .single();

  if (!membership) return null;

  // Fetch team with all members and their profiles
  const { data: team } = await supabase
    .from("teams")
    .select("*")
    .eq("id", membership.team_id)
    .single();

  if (!team) return null;

  const { data: members } = await supabase
    .from("team_members")
    .select("*, profile:profiles(*)")
    .eq("team_id", team.id)
    .order("joined_at", { ascending: true });

  return {
    ...team,
    members: members ?? [],
  } as TeamWithMembers;
}

export async function promoteMember(
  teamMemberId: string,
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  const profileId = await getProfileId(userId);
  if (!profileId) return { success: false, error: "Profile not found" };

  const supabase = getSupabaseSecretClient();

  // Verify caller is captain of the same team
  const { data: target } = await supabase
    .from("team_members")
    .select("id, team_id, role")
    .eq("id", teamMemberId)
    .single();

  if (!target) return { success: false, error: "Member not found" };

  const { data: callerMembership } = await supabase
    .from("team_members")
    .select("id, role")
    .eq("team_id", target.team_id)
    .eq("profile_id", profileId)
    .single();

  if (!callerMembership || callerMembership.role !== "captain") {
    return { success: false, error: "Only the captain can promote members" };
  }

  // Demote current captain and promote target
  const { error: demoteError } = await supabase
    .from("team_members")
    .update({ role: "member" })
    .eq("id", callerMembership.id);

  if (demoteError) {
    console.error("Failed to demote captain:", demoteError);
    return { success: false, error: "Failed to promote member" };
  }

  const { error: promoteError } = await supabase
    .from("team_members")
    .update({ role: "captain" })
    .eq("id", teamMemberId);

  if (promoteError) {
    // Rollback
    await supabase
      .from("team_members")
      .update({ role: "captain" })
      .eq("id", callerMembership.id);
    console.error("Failed to promote member:", promoteError);
    return { success: false, error: "Failed to promote member" };
  }

  return { success: true };
}

export async function renameTeam(
  newName: string,
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  const trimmed = newName.trim();
  if (!trimmed) return { success: false, error: "Team name is required" };

  const profileId = await getProfileId(userId);
  if (!profileId) return { success: false, error: "Profile not found" };

  const supabase = getSupabaseSecretClient();

  // Find user's team membership
  const { data: membership } = await supabase
    .from("team_members")
    .select("team_id, role")
    .eq("profile_id", profileId)
    .single();

  if (!membership) return { success: false, error: "You are not on a team" };
  if (membership.role !== "captain") {
    return { success: false, error: "Only the captain can rename the team" };
  }

  const { error } = await supabase
    .from("teams")
    .update({ name: trimmed })
    .eq("id", membership.team_id);

  if (error) {
    console.error("Failed to rename team:", error);
    return { success: false, error: "Failed to rename team" };
  }

  return { success: true };
}

export async function kickMember(
  teamMemberId: string,
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  const profileId = await getProfileId(userId);
  if (!profileId) return { success: false, error: "Profile not found" };

  const supabase = getSupabaseSecretClient();

  // Verify target exists
  const { data: target } = await supabase
    .from("team_members")
    .select("id, team_id, profile_id, role")
    .eq("id", teamMemberId)
    .single();

  if (!target) return { success: false, error: "Member not found" };

  if (target.profile_id === profileId) {
    return { success: false, error: "You cannot kick yourself" };
  }

  if (target.role === "captain") {
    return { success: false, error: "You cannot kick the captain" };
  }

  // Verify caller is captain of the same team
  const { data: callerMembership } = await supabase
    .from("team_members")
    .select("id, role")
    .eq("team_id", target.team_id)
    .eq("profile_id", profileId)
    .single();

  if (!callerMembership || callerMembership.role !== "captain") {
    return { success: false, error: "Only the captain can kick members" };
  }

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", teamMemberId);

  if (error) {
    console.error("Failed to kick member:", error);
    return { success: false, error: "Failed to kick member" };
  }

  return { success: true };
}
