import Link from "next/link";
import { redirect } from "next/navigation";
import { getProfile } from "@/app/2026/_actions/profile";
import { getMyTeam } from "@/app/2026/_actions/team";
import Path from "@/app/path";
import GlassPanel from "@/app/2026/_components/ui/GlassPanel";
import OnboardingFlow from "./_components/OnboardingFlow";
import { getRegistrationStatus } from "@/app/2026/_data/registrationConfig";

export default async function OnboardingPage() {
  const profile = await getProfile();
  const team = await getMyTeam();

  // Already fully onboarded
  if (profile?.onboarded && team) {
    redirect(Path[2026].Dashboard);
  }

  const regStatus = getRegistrationStatus();

  // If all registration is closed and this user hasn't started onboarding, block entry.
  // Existing users who have a profile can still complete their setup.
  if (!regStatus.anyOpen && !profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <GlassPanel className="max-w-md text-center">
          <h2 className="mb-3">Registration Closed</h2>
          <p className="font-main text-sm text-gray-400">
            Registration for Sumobots 2026 has closed. Follow us on Discord or
            Instagram for updates on next year&apos;s competition.
          </p>
          <Link
            href={Path[2026].Root}
            className="font-main mt-6 inline-block text-sm text-rose-400 transition-colors hover:text-rose-300"
          >
            &larr; Back to Sumobots
          </Link>
        </GlassPanel>
      </div>
    );
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
            registrationOpen={regStatus.anyOpen}
            standardOpen={regStatus.standardOpen}
            openOpen={regStatus.openOpen}
          />
        </GlassPanel>
      </div>
    </div>
  );
}
