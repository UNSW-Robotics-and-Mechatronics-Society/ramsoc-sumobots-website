import { redirect } from "next/navigation";
import { getProfile } from "@/app/2026/_actions/profile";
import { getMyTeam } from "@/app/2026/_actions/team";
import Path from "@/app/path";
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
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <h1 className="mb-2 text-center text-3xl sm:text-4xl">Register</h1>
          <p className="mb-8 text-center text-gray-400">
            Set up your profile and join a team
          </p>
          <OnboardingFlow
            hasProfile={!!profile}
            hasTeam={!!team}
          />
        </div>
      </div>
    </div>
  );
}
