"use client";

import Image from "next/image";
import { cn } from "@/app/_utils/cn";
import Badge from "@/app/2026/_components/ui/Badge";
import type { BlogTeamProfile } from "../_types";

/** Round team avatar — falls back to initials when there's no image. */
export function TeamAvatar({
  team,
  size = 44,
  className,
}: {
  team: Pick<BlogTeamProfile, "teamName" | "avatarUrl">;
  size?: number;
  className?: string;
}) {
  const initials = team.teamName
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-linear-to-br from-rose-500/30 to-blue-500/30",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {team.avatarUrl ? (
        <Image
          src={team.avatarUrl}
          alt={team.teamName}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      ) : (
        <span
          className="font-main font-semibold text-white"
          style={{ fontSize: size * 0.36 }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

/** Profile header card: avatar, team name, robot name, category, and bio. */
export default function TeamProfileHeader({
  team,
  className,
}: {
  team: BlogTeamProfile;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <TeamAvatar team={team} size={96} />
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-white">{team.teamName}</h2>
          <Badge variant={team.category === "open" ? "info" : "default"}>
            {team.category}
          </Badge>
        </div>
        <p className="font-main text-sm text-gray-400">
          Building <span className="text-rose-400">{team.robotName}</span>
        </p>
      </div>
      <p className="font-main max-w-md text-sm text-gray-300">{team.bio}</p>
    </div>
  );
}
