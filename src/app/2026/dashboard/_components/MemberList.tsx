"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { TeamMember, Profile } from "@/app/_types/registration";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";
import { promoteMember, kickMember } from "@/app/2026/_actions/team";

type MemberWithProfile = TeamMember & { profile: Profile };

export default function MemberList({
  members,
  isCaptain = false,
  currentProfileId,
}: {
  members: MemberWithProfile[];
  isCaptain?: boolean;
  currentProfileId?: string;
}) {
  const [confirmAction, setConfirmAction] = useState<{
    type: "kick" | "promote";
    memberId: string;
    name: string;
  } | null>(null);
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleConfirm() {
    if (!confirmAction) return;
    startTransition(async () => {
      const result =
        confirmAction.type === "kick"
          ? await kickMember(confirmAction.memberId)
          : await promoteMember(confirmAction.memberId);

      if (result.success) {
        setConfirmAction(null);
        router.refresh();
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <Card>
      <h3 className="mb-3">Members</h3>
      <ul className="flex flex-col gap-3">
        {members.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="font-main truncate text-sm text-white">
                {member.profile.full_name}
              </p>
              <p className="font-main truncate text-xs text-gray-400">
                {member.profile.university}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {member.role === "captain" && (
                <Badge variant="captain">Captain</Badge>
              )}
              {isCaptain &&
                member.profile_id !== currentProfileId &&
                member.role !== "captain" && (
                  <>
                    <button
                      onClick={() =>
                        setConfirmAction({
                          type: "promote",
                          memberId: member.id,
                          name: member.profile.full_name,
                        })
                      }
                      className="font-main rounded px-2 py-1 text-xs text-blue-400 transition-colors hover:bg-white/5 hover:text-blue-300"
                      title="Make captain"
                    >
                      Promote
                    </button>
                    <button
                      onClick={() =>
                        setConfirmAction({
                          type: "kick",
                          memberId: member.id,
                          name: member.profile.full_name,
                        })
                      }
                      className="font-main rounded px-2 py-1 text-xs text-red-400 transition-colors hover:bg-white/5 hover:text-red-300"
                      title="Remove from team"
                    >
                      Kick
                    </button>
                  </>
                )}
            </div>
          </li>
        ))}
      </ul>

      {/* Confirmation dialog */}
      {confirmAction && (
        <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="font-main mb-3 text-center text-sm text-gray-300">
            {confirmAction.type === "kick" ? (
              <>
                Remove <b className="text-white">{confirmAction.name}</b> from
                the team?
              </>
            ) : (
              <>
                Make <b className="text-white">{confirmAction.name}</b> the new
                captain? You will become a regular member.
              </>
            )}
          </p>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="full"
              onClick={() => {
                setConfirmAction(null);
                setError(undefined);
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="full"
              className={
                confirmAction.type === "kick"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }
              onClick={handleConfirm}
              disabled={isPending}
            >
              {isPending
                ? "..."
                : confirmAction.type === "kick"
                  ? "Remove"
                  : "Promote"}
            </Button>
          </div>
          {error && (
            <p className="font-main mt-2 text-center text-xs text-red-400">
              {error}
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
