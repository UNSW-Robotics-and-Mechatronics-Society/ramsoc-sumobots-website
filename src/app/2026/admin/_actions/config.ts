"use server";

import { cookies } from "next/headers";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import type { AppConfig } from "@/app/2026/_actions/appConfig";

async function assertAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    throw new Error("Unauthorized");
  }
}

export async function getAdminAppConfig(): Promise<AppConfig> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();
  const { data } = await supabase
    .from("app_config")
    .select("season_phase, standard_closes, open_closes, payment_deadline")
    .eq("competition_year", 2026)
    .single();

  if (!data) throw new Error("App config not found");

  return {
    season_phase: data.season_phase as "preseason" | "midseason",
    standard_closes: new Date(data.standard_closes),
    open_closes: new Date(data.open_closes),
    payment_deadline: new Date(data.payment_deadline),
  };
}

export async function updateSeasonPhase(
  phase: "preseason" | "midseason",
): Promise<{ success: boolean; error?: string }> {
  await assertAdmin();
  const supabase = getSupabaseSecretClient();

  const { error } = await supabase
    .from("app_config")
    .update({ season_phase: phase, updated_at: new Date().toISOString() })
    .eq("competition_year", 2026);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateRegistrationDates(dates: {
  standard_closes: string;
  open_closes: string;
  payment_deadline: string;
}): Promise<{ success: boolean; error?: string }> {
  await assertAdmin();

  const parsed = {
    standard_closes: new Date(dates.standard_closes),
    open_closes: new Date(dates.open_closes),
    payment_deadline: new Date(dates.payment_deadline),
  };

  for (const [key, val] of Object.entries(parsed)) {
    if (isNaN(val.getTime())) {
      return { success: false, error: `Invalid date for ${key}` };
    }
  }

  const supabase = getSupabaseSecretClient();
  const { error } = await supabase
    .from("app_config")
    .update({
      standard_closes: parsed.standard_closes.toISOString(),
      open_closes: parsed.open_closes.toISOString(),
      payment_deadline: parsed.payment_deadline.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("competition_year", 2026);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
