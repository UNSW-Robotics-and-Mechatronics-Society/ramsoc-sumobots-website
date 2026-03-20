import { redirect } from "next/navigation";
import { getProfile } from "@/app/2026/_actions/profile";
import { getMyTeam } from "@/app/2026/_actions/team";
import Path from "@/app/path";
import ProfileCard from "./_components/ProfileCard";
import TeamCard from "./_components/TeamCard";
import MemberList from "./_components/MemberList";
import JoinCodeDisplay from "./_components/JoinCodeDisplay";
import NoTeamState from "./_components/NoTeamState";

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
        <h1 className="mb-8 text-center text-3xl sm:text-4xl">Dashboard</h1>

        <div className="flex flex-col gap-5">
          <ProfileCard profile={profile} />

          {team ? (
            <>
              <TeamCard team={team} />
              <JoinCodeDisplay code={team.join_code} />
              <MemberList members={team.members} />
            </>
          ) : (
            <NoTeamState />
          )}
        </div>
      </div>
    </div>
  );
}
