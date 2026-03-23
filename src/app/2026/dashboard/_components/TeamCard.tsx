"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { TeamWithMembers } from "@/app/_types/registration";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";
import { renameTeam } from "@/app/2026/_actions/team";

const MIN_MEMBERS_TO_ACTIVATE = 3;

export default function TeamCard({
  team,
  isCaptain = false,
}: {
  team: TeamWithMembers;
  isCaptain?: boolean;
}) {
  const canActivate = !team.paid && team.members.length >= MIN_MEMBERS_TO_ACTIVATE;
  const needsMoreMembers = !team.paid && team.members.length < MIN_MEMBERS_TO_ACTIVATE;
  const membersNeeded = MIN_MEMBERS_TO_ACTIVATE - team.members.length;

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
          <div className="mb-1 flex min-w-0 items-center gap-2">
            {editing ? (
              <input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                className="font-display w-full rounded border border-white/20 bg-white/5 px-2 py-1 text-xl text-white outline-none focus:border-rose-500"
                autoFocus
                disabled={isPending}
              />
            ) : (
              <>
                <h3 className="truncate">{team.name}</h3>
                {isCaptain && (
                  <button
                    onClick={() => setEditing(true)}
                    className="font-main shrink-0 rounded px-2 py-0.5 text-xs text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Rename
                  </button>
                )}
              </>
            )}
          </div>
          {error && (
            <p className="font-main mb-1 text-xs text-red-400">{error}</p>
          )}
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

      {!team.paid && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="font-main mb-3 text-center text-sm text-gray-400">
            Team is not currently active. Pay the entry fee to activate your team.
          </p>
          <Button
            size="full"
            disabled={!canActivate}
            className={canActivate ? "" : "cursor-not-allowed"}
          >
            Pay Entry Fee
          </Button>
          {needsMoreMembers && (
            <p className="font-main mt-2 text-center text-xs text-gray-500">
              Need {membersNeeded} more member{membersNeeded !== 1 ? "s" : ""} to activate (minimum {MIN_MEMBERS_TO_ACTIVATE})
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
