import Link from "next/link";
import { redirect } from "next/navigation";
import { getProfile } from "@/app/2026/_actions/profile";
import { getMyTeam } from "@/app/2026/_actions/team";
import Path from "@/app/path";
import GlassPanel from "@/app/2026/_components/ui/GlassPanel";
import OnboardingFlow from "./_components/OnboardingFlow";

export default async function OnboardingPage() {
  const profile = await getProfile();
  const team = await getMyTeam();

  // Already fully onboarded
  if (profile?.onboarded && team) {
    redirect(Path[2026].Dashboard);
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 pt-12 pb-24">
      <div className="w-full max-w-lg">
        <Link
          href={Path[2026].Root}
          className="font-main mb-4 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sumobots
        </Link>
        <GlassPanel>
          <OnboardingFlow
            hasProfile={!!profile}
            hasTeam={!!team}
          />
        </GlassPanel>
      </div>
    </div>
  );
}
