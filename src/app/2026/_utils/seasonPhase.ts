import type { AppConfig } from "@/app/2026/_actions/appConfig";

export function isCategoryLocked(
  config: AppConfig,
  category: "standard" | "open",
): boolean {
  return category === "standard"
    ? config.standard_phase === "midseason"
    : config.open_phase === "midseason";
}
