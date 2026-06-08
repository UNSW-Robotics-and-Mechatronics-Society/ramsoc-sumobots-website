"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/2026/_components/ui/Button";
import Badge from "@/app/2026/_components/ui/Badge";
import {
  updateSeasonPhase,
  updateRegistrationDates,
} from "@/app/2026/admin/_actions/config";
import type { AppConfig } from "@/app/2026/_actions/appConfig";

function toLocalDatetimeValue(date: Date): string {
  // Returns "YYYY-MM-DDTHH:mm" in local time for datetime-local inputs
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

export default function SettingsPanel({ config }: { config: AppConfig }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [standardCloses, setStandardCloses] = useState(
    toLocalDatetimeValue(config.standard_closes),
  );
  const [openCloses, setOpenCloses] = useState(
    toLocalDatetimeValue(config.open_closes),
  );
  const [paymentDeadline, setPaymentDeadline] = useState(
    toLocalDatetimeValue(config.payment_deadline),
  );

  function notify(msg: string) {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  }

  function handleTogglePhase() {
    const newPhase =
      config.season_phase === "preseason" ? "midseason" : "preseason";
    startTransition(async () => {
      setError(null);
      const result = await updateSeasonPhase(newPhase);
      if (result.success) {
        notify(
          newPhase === "midseason"
            ? "Switched to midseason — teams are now locked."
            : "Switched to preseason — teams are now open.",
        );
        router.refresh();
      } else {
        setError(result.error ?? "Failed to update season phase");
      }
    });
  }

  function handleSaveDates() {
    startTransition(async () => {
      setError(null);
      const result = await updateRegistrationDates({
        standard_closes: new Date(standardCloses).toISOString(),
        open_closes: new Date(openCloses).toISOString(),
        payment_deadline: new Date(paymentDeadline).toISOString(),
      });
      if (result.success) {
        notify("Registration dates updated.");
        router.refresh();
      } else {
        setError(result.error ?? "Failed to update dates");
      }
    });
  }

  const isMidseason = config.season_phase === "midseason";

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      {error && (
        <p className="font-main rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}
      {success && (
        <p className="font-main rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          {success}
        </p>
      )}

      {/* Season phase toggle */}
      <section className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h3 className="font-main mb-1 text-base font-semibold text-white">
          Season Phase
        </h3>
        <p className="font-main mb-4 text-sm text-gray-400">
          Toggle between preseason (teams open) and midseason (teams locked).
          When midseason is active, participants cannot join, leave, or create
          teams. Admin actions are unaffected.
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-3">
            <span className="font-main text-sm text-gray-300">Current:</span>
            <Badge variant={isMidseason ? "warning" : "success"}>
              {isMidseason ? "Midseason" : "Preseason"}
            </Badge>
          </div>
          <Button
            variant={isMidseason ? "secondary" : "primary"}
            size="default"
            onClick={handleTogglePhase}
            disabled={isPending}
          >
            {isPending
              ? "Saving..."
              : isMidseason
              ? "Switch to Preseason"
              : "Switch to Midseason"}
          </Button>
        </div>

        {isMidseason && (
          <p className="font-main mt-3 text-xs text-amber-400">
            Teams are currently locked. Participants cannot join, leave, or create
            teams.
          </p>
        )}
      </section>

      {/* Registration date controls */}
      <section className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h3 className="font-main mb-1 text-base font-semibold text-white">
          Registration Deadlines
        </h3>
        <p className="font-main mb-4 text-sm text-gray-400">
          Dates are stored in your local timezone and converted to UTC. These
          control when new team creation and joining is accepted.
        </p>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-main text-xs font-medium text-gray-400">
              Standard (UNSW-only) closes
            </span>
            <input
              type="datetime-local"
              value={standardCloses}
              onChange={(e) => setStandardCloses(e.target.value)}
              className="font-main rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-rose-500 [color-scheme:dark]"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-main text-xs font-medium text-gray-400">
              Open (inter-uni) closes
            </span>
            <input
              type="datetime-local"
              value={openCloses}
              onChange={(e) => setOpenCloses(e.target.value)}
              className="font-main rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-rose-500 [color-scheme:dark]"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-main text-xs font-medium text-gray-400">
              Payment deadline
            </span>
            <input
              type="datetime-local"
              value={paymentDeadline}
              onChange={(e) => setPaymentDeadline(e.target.value)}
              className="font-main rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-rose-500 [color-scheme:dark]"
            />
          </label>

          <Button
            variant="secondary"
            size="default"
            onClick={handleSaveDates}
            disabled={isPending}
            className="self-start"
          >
            {isPending ? "Saving..." : "Save Dates"}
          </Button>
        </div>
      </section>
    </div>
  );
}
