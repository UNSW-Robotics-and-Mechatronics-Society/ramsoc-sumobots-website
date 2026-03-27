"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/2026/_components/ui/Button";
import { leaveTeam } from "@/app/2026/_actions/team";

export default function LeaveTeamButton() {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleLeave() {
    startTransition(async () => {
      const result = await leaveTeam();
      if (result.success) {
        router.refresh();
      } else {
        setError(result.error);
        setConfirming(false);
      }
    });
  }

  if (confirming) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="font-main text-sm text-red-400">Are you sure?</p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="default"
            onClick={() => setConfirming(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="default"
            className="bg-red-600 hover:bg-red-700"
            onClick={handleLeave}
            disabled={isPending}
          >
            {isPending ? "Leaving..." : "Confirm"}
          </Button>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Button
        variant="ghost"
        size="default"
        className="text-red-400 hover:text-red-300"
        onClick={() => setConfirming(true)}
      >
        Leave Team
      </Button>
    </div>
  );
}
