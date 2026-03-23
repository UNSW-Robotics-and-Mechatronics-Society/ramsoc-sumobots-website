import { redirect } from "next/navigation";
import { getProfile } from "@/app/2026/_actions/profile";
import { getMyTeam, browseTeams } from "@/app/2026/_actions/team";
import Path from "@/app/path";
import GlassPanel from "@/app/2026/_components/ui/GlassPanel";
import DashboardContent from "./_components/DashboardContent";

export default async function DashboardPage() {
  const profile = await getProfile();

  if (!profile) {
    redirect(Path[2026].Onboarding);
  }

  const team = await getMyTeam();
  const browsable = team ? [] : await browseTeams();

  return (
    <div className="flex min-h-screen flex-col items-center px-4 pt-12 pb-24">
      <div className="w-full max-w-lg">
        <GlassPanel>
          <DashboardContent profile={profile} team={team} browsableTeams={browsable} />
        </GlassPanel>
      </div>
    </div>
  );
}
