"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/app/2026/_components/ui/Button";

export default function AccountBar() {
  const { user } = useUser();
  const clerk = useClerk();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress;
  const initials = user.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : email
      ? email.charAt(0).toUpperCase()
      : "?";

  return (
    <div className="font-main mb-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <div className="flex min-w-0 items-center gap-2.5">
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt=""
            className="h-7 w-7 shrink-0 rounded-full"
          />
        ) : (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-xs font-medium text-rose-400">
            {initials}
          </div>
        )}
        <span className="truncate text-xs text-gray-400">
          {email ?? "Signed in"}
        </span>
      </div>

      {showConfirm ? (
        <div className="flex shrink-0 items-center gap-1.5">
          <Button
            variant="ghost"
            size="default"
            className="h-7 min-h-0 px-2 py-0 text-xs"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="default"
            className="h-7 min-h-0 px-2 py-0 text-xs"
            onClick={() => clerk.signOut()}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="default"
          className="h-7 min-h-0 shrink-0 px-2 py-0 text-xs text-gray-400 hover:text-white"
          onClick={() => setShowConfirm(true)}
        >
          Switch Account
        </Button>
      )}
    </div>
  );
}
