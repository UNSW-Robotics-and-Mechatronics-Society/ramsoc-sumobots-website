"use server";

import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import { REGISTRATION } from "@/app/2026/_data/registrationConfig";

export type AppConfig = {
  season_phase: "preseason" | "midseason";
  standard_closes: Date;
  open_closes: Date;
  payment_deadline: Date;
};

export async function getAppConfig(): Promise<AppConfig> {
  const supabase = getSupabaseSecretClient();
  const { data } = await supabase
    .from("app_config")
    .select("season_phase, standard_closes, open_closes, payment_deadline")
    .eq("competition_year", 2026)
    .single();

  if (!data) {
    return {
      season_phase: "preseason",
      standard_closes: REGISTRATION.standardCloses,
      open_closes: REGISTRATION.openCloses,
      payment_deadline: REGISTRATION.paymentDeadline,
    };
  }

  return {
    season_phase: data.season_phase as "preseason" | "midseason",
    standard_closes: new Date(data.standard_closes),
    open_closes: new Date(data.open_closes),
    payment_deadline: new Date(data.payment_deadline),
  };
}

export async function isMidseason(): Promise<boolean> {
  const config = await getAppConfig();
  return config.season_phase === "midseason";
}
