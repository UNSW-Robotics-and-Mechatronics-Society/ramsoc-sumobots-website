// ── Registration deadline configuration ──────────────────────────────────────
// Defaults used as fallback. Live values are stored in the app_config DB table
// and editable from the admin dashboard.

export const REGISTRATION = {
  standardCloses: new Date("2026-06-04T12:00:00+10:00"),
  openCloses: new Date("2026-07-26T23:59:59+10:00"),
  paymentDeadline: new Date("2026-06-04T23:59:59+10:00"),
} as const;

export type RegistrationDates = {
  standardCloses: Date;
  openCloses: Date;
  paymentDeadline: Date;
};

export type RegistrationStatus = {
  standardOpen: boolean;
  openOpen: boolean;
  anyOpen: boolean;
  paymentOpen: boolean;
  /** The soonest upcoming deadline, for countdown display */
  nextDeadline: Date | null;
  nextDeadlineLabel: string | null;
};

export function getRegistrationStatus(
  now = new Date(),
  dates: RegistrationDates = REGISTRATION,
): RegistrationStatus {
  const standardOpen = now < dates.standardCloses;
  const openOpen = now < dates.openCloses;
  const paymentOpen = now < dates.paymentDeadline;
  const anyOpen = standardOpen || openOpen;

  const upcoming = [
    { date: dates.standardCloses, label: "Standard registration closes" },
    { date: dates.paymentDeadline, label: "Payment deadline" },
    { date: dates.openCloses, label: "Open registration closes" },
  ]
    .filter((d) => d.date > now)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return {
    standardOpen,
    openOpen,
    anyOpen,
    paymentOpen,
    nextDeadline: upcoming[0]?.date ?? null,
    nextDeadlineLabel: upcoming[0]?.label ?? null,
  };
}
