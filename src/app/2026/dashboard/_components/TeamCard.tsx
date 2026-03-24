"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { TeamWithMembers } from "@/app/_types/registration";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";
import { renameTeam } from "@/app/2026/_actions/team";
import { MEMBER_LIMITS } from "@/app/2026/_data/teamConfig";
import PaymentModal from "./PaymentModal";

const ENTRY_FEES: Record<string, number> = {
  standard: Number(process.env.NEXT_PUBLIC_STANDARD_TEAM_PRICE) || 0,
  open: Number(process.env.NEXT_PUBLIC_OPEN_TEAM_PRICE) || 0,
};

export default function TeamCard({
  team,
  isCaptain = false,
}: {
  team: TeamWithMembers;
  isCaptain?: boolean;
}) {
  const minMembers = MEMBER_LIMITS[team.category].min;
  const canActivate = !team.paid && team.members.length >= minMembers;
  const needsMoreMembers = !team.paid && team.members.length < minMembers;
  const membersNeeded = minMembers - team.members.length;
  const priceCents = ENTRY_FEES[team.category] || 0;

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(team.name);
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed || trimmed === team.name) {
      setEditing(false);
      setName(team.name);
      return;
    }
    startTransition(async () => {
      const result = await renameTeam(trimmed);
      if (result.success) {
        setEditing(false);
        setError(undefined);
        router.refresh();
      } else {
        setError(result.error);
      }
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditing(false);
      setName(team.name);
      setError(undefined);
    }
  }

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 truncate">{team.name}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="info">
              {team.category === "standard" ? "Standard" : "Open"}
            </Badge>
            <Badge variant={team.paid ? "success" : "warning"}>
              {team.paid ? "Active" : "Not Active"}
            </Badge>
          </div>
        </div>
        <span className="font-main shrink-0 text-sm text-gray-400">
          {team.members.length} member{team.members.length !== 1 ? "s" : ""}
        </span>
      </div>

      {isCaptain && !editing && (
        <button
          onClick={() => setEditing(true)}
          className="font-main mt-3 rounded px-2 py-0.5 text-xs text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          Rename team
        </button>
      )}

      {editing && (
        <div className="mt-3 flex flex-col gap-2">
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="font-display w-full rounded border border-white/20 bg-white/5 px-2 py-1 text-xl text-white outline-none focus:border-rose-500"
            autoFocus
            disabled={isPending}
          />
          {error && (
            <p className="font-main text-xs text-red-400">{error}</p>
          )}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="default"
              className="h-8 px-3 text-xs"
              onClick={() => {
                setEditing(false);
                setName(team.name);
                setError(undefined);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="default"
              className="h-8 px-3 text-xs"
              onClick={handleSave}
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      )}

      {!team.paid && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="font-main mb-3 text-center text-sm text-gray-400">
            Team is not currently active. Pay the entry fee to activate your team.
          </p>
          <Button
            size="full"
            disabled={!canActivate || !isCaptain}
            className={canActivate && isCaptain ? "" : "cursor-not-allowed"}
            onClick={() => setPaymentOpen(true)}
          >
            {canActivate && !isCaptain
              ? "Only the captain can pay"
              : priceCents > 0
                ? `Pay $${(priceCents / 100).toFixed(2)} Entry Fee`
                : "Pay Entry Fee"}
          </Button>
          <PaymentModal
            open={paymentOpen}
            onClose={() => setPaymentOpen(false)}
            priceCents={priceCents}
            category={team.category}
          />
          {needsMoreMembers && (
            <p className="font-main mt-2 text-center text-xs text-gray-500">
              Need {membersNeeded} more member{membersNeeded !== 1 ? "s" : ""} to activate (minimum {minMembers})
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
