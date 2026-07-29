"use server";

import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import { getProfile } from "@/app/2026/_actions/profile";

export type PickabotsStatus = {
  onboarded: boolean;
  isSpectator: boolean;
};

export async function getPickabotsStatus(): Promise<PickabotsStatus | null> {
  const profile = await getProfile();
  if (!profile) return null;

  const supabase = getSupabaseSecretClient();
  const { data, error } = await supabase
    .from("users") // pickabots' table, same Supabase project
    .select("onboarded, is_spectator, profile_id")
    .eq("profile_id", profile.id)
    .limit(1);

  if (error) {
    throw new Error(`Failed to check pickabots onboarding: ${error.message}`);
  }

  const row = data?.[0];
  return {
    onboarded: Boolean(row?.onboarded),
    isSpectator: Boolean(row?.is_spectator),
  };
}
