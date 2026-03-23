"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Profile, TeamWithMembers, TeamBrowseItem } from "@/app/_types/registration";
import FadeIn from "@/app/2026/_components/ui/FadeIn";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";
import TeamCard from "./TeamCard";
import MemberList from "./MemberList";
import JoinCodeDisplay from "./JoinCodeDisplay";
import NoTeamState from "./NoTeamState";
import LeaveTeamButton from "./LeaveTeamButton";
import ProfileTab from "./ProfileTab";

type Tab = "home" | "team" | "profile";

function ActionItem({
  label,
  done,
  onClick,
}: {
  label: string;
  done: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={done}
      className={`font-main flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors ${
        done
          ? "bg-white/5 text-gray-500 line-through"
          : "bg-white/5 text-white hover:bg-white/10"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
          done
            ? "border-green-500/50 bg-green-500/20 text-green-400"
            : "border-white/20"
        }`}
      >
        {done ? "\u2713" : ""}
      </span>
      {label}
    </button>
  );
}

const TAB_ICONS: Record<Tab, string> = {
  home: "\u2302",
  team: "\u2630",
  profile: "\u2603",
};

const TAB_LABELS: Record<Tab, string> = {
  home: "Home",
  team: "Team",
  profile: "Profile",
};

export default function DashboardContent({
  profile,
  team,
  browsableTeams,
}: {
  profile: Profile;
  team: TeamWithMembers | null;
  browsableTeams: TeamBrowseItem[];
}) {
  const [tab, setTab] = useState<Tab>("home");

  const isCaptain =
    team?.members.some(
      (m) => m.profile_id === profile.id && m.role === "captain",
    ) ?? false;

  const hasTeam = !!team;
  const hasEnoughMembers = (team?.members.length ?? 0) >= 3;
  const isPaid = team?.paid ?? false;

  return (
    <div className="flex min-h-[60vh] flex-col">
      {/* Scrollable content */}
      <div className="flex-1 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* ── Home Tab ── */}
            {tab === "home" && (
              <div className="flex flex-col gap-5">
                <Card>
                  <h3 className="mb-1">
                    Welcome, {profile.full_name.split(" ")[0]}
                  </h3>
                  <p className="font-main text-sm text-gray-400">
                    {hasTeam && isPaid
                      ? "You're all set for the competition!"
                      : "Here's what you need to do to get ready."}
                  </p>
                </Card>

                <Card>
                  <h3 className="mb-3 text-base">Action Items</h3>
                  <div className="flex flex-col gap-2">
                    <ActionItem
                      label="Create or join a team"
                      done={hasTeam}
                      onClick={() => !hasTeam && setTab("team")}
                    />
                    <ActionItem
                      label="Get at least 3 team members"
                      done={hasEnoughMembers}
                      onClick={() =>
                        hasTeam && !hasEnoughMembers && setTab("team")
                      }
                    />
                    <ActionItem
                      label="Pay the entry fee to activate your team"
                      done={isPaid}
                      onClick={() =>
                        hasTeam && hasEnoughMembers && !isPaid && setTab("team")
                      }
                    />
                  </div>
                </Card>

                {hasTeam && (
                  <Card>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-main text-xs text-gray-500">
                          Your team
                        </p>
                        <h3 className="text-base">{team.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={isPaid ? "success" : "warning"}>
                          {isPaid ? "Active" : "Not Active"}
                        </Badge>
                        <span className="font-main text-sm text-gray-400">
                          {team.members.length}/6
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setTab("team")}
                      className="font-main mt-3 text-sm text-rose-400 transition-colors hover:text-rose-300"
                    >
                      View team details &rarr;
                    </button>
                  </Card>
                )}
              </div>
            )}

            {/* ── Team Tab ── */}
            {tab === "team" && (
              <div className="flex flex-col gap-5">
                {team ? (
                  <>
                    <TeamCard team={team} isCaptain={isCaptain} />
                    <JoinCodeDisplay code={team.join_code} />
                    <MemberList
                      members={team.members}
                      isCaptain={isCaptain}
                      currentProfileId={profile.id}
                    />
                    <LeaveTeamButton />
                  </>
                ) : (
                  <NoTeamState teams={browsableTeams} />
                )}
              </div>
            )}

            {/* ── Profile Tab ── */}
            {tab === "profile" && <ProfileTab profile={profile} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom tab bar */}
      <div className="sticky bottom-0 -mx-6 border-t border-white/10 bg-black/60 px-6 pb-6 pt-2 backdrop-blur-xl sm:-mx-8 sm:px-8 sm:pb-8">
        <div className="flex justify-around">
          {(["home", "team", "profile"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex flex-col items-center gap-1 rounded-lg px-6 py-2 transition-colors ${
                tab === t
                  ? "text-rose-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={tab === t ? 2.5 : 1.5}
              >
                {t === "home" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
                  />
                )}
                {t === "team" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                )}
                {t === "profile" && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                )}
              </svg>
              <span className="font-main text-xs">{TAB_LABELS[t]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
