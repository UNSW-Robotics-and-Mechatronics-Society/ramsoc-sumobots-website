"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";
import type { ProfileWithTeam } from "@/app/_types/registration";
import {
  adminKickFromTeam,
  adminDeleteProfile,
} from "@/app/2026/admin/_actions/individuals";

export default function IndividualsTable({
  profiles,
}: {
  profiles: ProfileWithTeam[];
}) {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const router = useRouter();

  const filtered = profiles.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.full_name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      (p.zid && p.zid.toLowerCase().includes(q))
    );
  });

  function handleAction(action: () => Promise<unknown>) {
    startTransition(async () => {
      await action();
      setConfirmAction(null);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search by name, email, or zID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="font-main max-w-sm min-h-[40px] rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-rose-500"
      />

      <div className="font-main text-sm text-gray-400">
        {filtered.length} profile{filtered.length !== 1 ? "s" : ""}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/80">
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Name
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Email
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                University / zID
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Team
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b border-gray-800/50 transition-colors hover:bg-gray-800/30"
              >
                <td className="font-main px-4 py-3 text-sm text-white">
                  {p.full_name}
                </td>
                <td className="font-main px-4 py-3 text-sm text-gray-300">
                  {p.email}
                </td>
                <td className="font-main px-4 py-3 text-sm text-gray-300">
                  {p.university}
                  {p.zid && ` · ${p.zid}`}
                </td>
                <td className="px-4 py-3">
                  {p.team_name ? (
                    <div className="flex items-center gap-2">
                      <span className="font-main text-sm text-white">
                        {p.team_name}
                      </span>
                      {p.team_role === "captain" && (
                        <Badge variant="captain">Captain</Badge>
                      )}
                    </div>
                  ) : (
                    <span className="font-main text-sm text-gray-500">
                      No team
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {p.team_id && (
                      <Button
                        variant="ghost"
                        size="default"
                        className="text-xs text-amber-400"
                        onClick={() => {
                          if (confirmAction === `kick-${p.id}`) {
                            handleAction(() => adminKickFromTeam(p.id));
                          } else {
                            setConfirmAction(`kick-${p.id}`);
                          }
                        }}
                        disabled={isPending}
                      >
                        {confirmAction === `kick-${p.id}`
                          ? "Confirm?"
                          : "Kick"}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="default"
                      className="text-xs text-red-400"
                      onClick={() => {
                        if (confirmAction === `delete-${p.id}`) {
                          handleAction(() => adminDeleteProfile(p.id));
                        } else {
                          setConfirmAction(`delete-${p.id}`);
                        }
                      }}
                      disabled={isPending}
                    >
                      {confirmAction === `delete-${p.id}`
                        ? "Confirm?"
                        : "Delete"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
