import { redirect } from "next/navigation";
import { getProfile } from "@/app/2026/_actions/profile";
import { getMyTeam, browseTeams } from "@/app/2026/_actions/team";
import Path from "@/app/path";
import ProfileCard from "./_components/ProfileCard";
import TeamCard from "./_components/TeamCard";
import MemberList from "./_components/MemberList";
import JoinCodeDisplay from "./_components/JoinCodeDisplay";
import NoTeamState from "./_components/NoTeamState";
import LeaveTeamButton from "./_components/LeaveTeamButton";

export default async function DashboardPage() {
  const profile = await getProfile();

  if (!profile) {
    redirect(Path[2026].Onboarding);
  }

  const team = await getMyTeam();

  // Find current user's role
  const myMembership = team?.members.find(
    (m) => m.profile_id === profile.id,
  );
  const isCaptain = myMembership?.role === "captain";

  return (
    <div className="flex min-h-screen flex-col items-center px-4 pt-12 pb-24">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <h1 className="mb-8 text-center text-3xl sm:text-4xl">Dashboard</h1>

          <div className="flex flex-col gap-5">
            <ProfileCard profile={profile} />

            {team ? (
              <>
                <TeamCard team={team} />
                <JoinCodeDisplay code={team.join_code} />
                <MemberList members={team.members} />
                <LeaveTeamButton />
              </>
            ) : (
              <NoTeamState teams={await browseTeams()} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
