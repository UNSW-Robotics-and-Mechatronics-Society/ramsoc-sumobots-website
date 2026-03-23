"use client";

import Link from "next/link";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";
import Path from "@/app/path";
import type { TeamBrowseItem } from "@/app/_types/registration";

export default function NoTeamState({ teams }: { teams: TeamBrowseItem[] }) {
  return (
    <div className="flex flex-col gap-5">
      <Card className="text-center">
        <h3 className="mb-2">No Team Yet</h3>
        <p className="font-main mb-4 text-sm text-gray-400">
          Create a new team or join one with a code
        </p>
        <Link href={Path[2026].Onboarding}>
          <Button size="full">Create or Join a Team</Button>
        </Link>
      </Card>

      {teams.length > 0 && (
        <Card>
          <h3 className="mb-1">Browse Teams</h3>
          <p className="font-main mb-4 text-xs text-gray-400">
            Ask a team captain for their join code to join
          </p>
          <ul className="flex flex-col gap-2">
            {teams.map((team) => (
              <li
                key={team.name}
                className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5"
              >
                <span className="font-main min-w-0 truncate text-sm text-white">
                  {team.name}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge
                    variant={
                      team.category === "open" ? "info" : "default"
                    }
                  >
                    {team.category}
                  </Badge>
                  <span className="font-main text-xs text-gray-400">
                    {team.member_count}/6
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
