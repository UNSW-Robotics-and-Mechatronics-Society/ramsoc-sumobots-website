"use client";

import type { Profile, TeamWithMembers, TeamBrowseItem } from "@/app/_types/registration";
import FadeIn from "@/app/2026/_components/ui/FadeIn";
import ProfileCard from "./ProfileCard";
import TeamCard from "./TeamCard";
import MemberList from "./MemberList";
import JoinCodeDisplay from "./JoinCodeDisplay";
import NoTeamState from "./NoTeamState";
import LeaveTeamButton from "./LeaveTeamButton";

export default function DashboardContent({
  profile,
  team,
  browsableTeams,
}: {
  profile: Profile;
  team: TeamWithMembers | null;
  browsableTeams: TeamBrowseItem[];
}) {
  return (
    <>
      <FadeIn delay={0} direction="none">
        <h1 className="mb-8 text-center text-3xl sm:text-4xl">Dashboard</h1>
      </FadeIn>

      <div className="flex flex-col gap-5">
        <FadeIn delay={0.1}>
          <ProfileCard profile={profile} />
        </FadeIn>

        {team ? (
          <>
            <FadeIn delay={0.2}>
              <TeamCard team={team} />
            </FadeIn>
            <FadeIn delay={0.3}>
              <JoinCodeDisplay code={team.join_code} />
            </FadeIn>
            <FadeIn delay={0.4}>
              <MemberList members={team.members} />
            </FadeIn>
            <FadeIn delay={0.5}>
              <LeaveTeamButton />
            </FadeIn>
          </>
        ) : (
          <FadeIn delay={0.2}>
            <NoTeamState teams={browsableTeams} />
          </FadeIn>
        )}
      </div>
    </>
  );
}
