"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Profile, TeamWithMembers, TeamBrowseItem } from "@/app/_types/registration";
import FadeIn from "@/app/2026/_components/ui/FadeIn";
import ProfileCard from "./ProfileCard";
import TeamCard from "./TeamCard";
import MemberList from "./MemberList";
import JoinCodeDisplay from "./JoinCodeDisplay";
import NoTeamState from "./NoTeamState";
import LeaveTeamButton from "./LeaveTeamButton";
import ProfileTab from "./ProfileTab";

type Tab = "team" | "profile";

export default function DashboardContent({
  profile,
  team,
  browsableTeams,
}: {
  profile: Profile;
  team: TeamWithMembers | null;
  browsableTeams: TeamBrowseItem[];
}) {
  const [tab, setTab] = useState<Tab>("team");

  const isCaptain = team?.members.some(
    (m) => m.profile_id === profile.id && m.role === "captain",
  ) ?? false;

  return (
    <>
      <FadeIn delay={0} direction="none">
        <h1 className="mb-4 text-center text-3xl sm:text-4xl">Dashboard</h1>
      </FadeIn>

      {/* Tab switcher */}
      <div className="mb-6 flex justify-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
        {(["team", "profile"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`font-main flex-1 rounded-md px-4 py-2 text-sm capitalize transition-colors ${
              tab === t
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {tab === "team" && (
            <div className="flex flex-col gap-5">
              <ProfileCard profile={profile} />

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

          {tab === "profile" && <ProfileTab profile={profile} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
