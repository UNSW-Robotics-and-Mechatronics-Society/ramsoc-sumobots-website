"use server";

import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import { REGISTRATION } from "@/app/2026/_data/registrationConfig";

export type AppConfig = {
  standard_phase: "preseason" | "midseason";
  open_phase: "preseason" | "midseason";
  standard_closes: Date;
  open_closes: Date;
  payment_deadline: Date;
};

export function isCategoryLocked(
  config: AppConfig,
  category: "standard" | "open",
): boolean {
  return category === "standard"
    ? config.standard_phase === "midseason"
    : config.open_phase === "midseason";
}

export async function getAppConfig(): Promise<AppConfig> {
  const supabase = getSupabaseSecretClient();
  const { data } = await supabase
    .from("app_config")
    .select("standard_phase, open_phase, standard_closes, open_closes, payment_deadline")
    .eq("competition_year", 2026)
    .single();

  if (!data) {
    return {
      standard_phase: "preseason",
      open_phase: "preseason",
      standard_closes: REGISTRATION.standardCloses,
      open_closes: REGISTRATION.openCloses,
      payment_deadline: REGISTRATION.paymentDeadline,
    };
  }

  return {
    standard_phase: data.standard_phase as "preseason" | "midseason",
    open_phase: data.open_phase as "preseason" | "midseason",
    standard_closes: new Date(data.standard_closes),
    open_closes: new Date(data.open_closes),
    payment_deadline: new Date(data.payment_deadline),
  };
}
