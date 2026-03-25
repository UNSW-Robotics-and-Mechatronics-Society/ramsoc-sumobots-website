import { redirect } from "next/navigation";
import Link from "next/link";
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
    <div className="flex min-h-screen flex-col items-center px-4 pt-12 pb-20 sm:pb-8">
      <div className="w-full max-w-lg">
        <Link
          href={Path[2026].Root}
          className="font-main mb-4 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Sumobots
        </Link>
        <GlassPanel>
          <DashboardContent profile={profile} team={team} browsableTeams={browsable} />
        </GlassPanel>
      </div>
    </div>
  );
}
