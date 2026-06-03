// ── Registration deadline configuration ──────────────────────────────────────
// Update these each year. All dates are end-of-day in Australia/Sydney time.
// "Closed" means no new registrations accepted after that date.

export const REGISTRATION = {
  // Standard (UNSW-only) stream stops accepting new teams
  standardCloses: new Date("2026-06-03T23:59:59+10:00"),

  // Open (inter-uni) stream stops accepting new teams
  openCloses: new Date("2026-07-26T23:59:59+10:00"),

  // Hard payment deadline — teams must have paid by this date (last intro workshop)
  paymentDeadline: new Date("2026-06-04T23:59:59+10:00"),
} as const;

export type RegistrationStatus = {
  standardOpen: boolean;
  openOpen: boolean;
  anyOpen: boolean;
  paymentOpen: boolean;
  /** The soonest upcoming deadline, for countdown display */
  nextDeadline: Date | null;
  nextDeadlineLabel: string | null;
};

export function getRegistrationStatus(now = new Date()): RegistrationStatus {
  const standardOpen = now < REGISTRATION.standardCloses;
  const openOpen = now < REGISTRATION.openCloses;
  const paymentOpen = now < REGISTRATION.paymentDeadline;
  const anyOpen = standardOpen || openOpen;

  // Find the soonest future deadline
  const upcoming = [
    { date: REGISTRATION.standardCloses, label: "Standard registration closes" },
    { date: REGISTRATION.paymentDeadline, label: "Payment deadline" },
    { date: REGISTRATION.openCloses, label: "Open registration closes" },
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
