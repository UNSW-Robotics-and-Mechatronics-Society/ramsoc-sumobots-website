import { redirect } from "next/navigation";
import { getProfile } from "@/app/2026/_actions/profile";
import { getMyTeam } from "@/app/2026/_actions/team";
import { MEMBER_LIMITS } from "@/app/2026/_data/teamConfig";
import Path from "@/app/path";
import GlassPanel from "@/app/2026/_components/ui/GlassPanel";
import PaymentForm from "./_components/PaymentForm";

const ENTRY_FEES: Record<string, number> = {
  standard: Number(process.env.NEXT_PUBLIC_STANDARD_TEAM_PRICE) || 0,
  open: Number(process.env.NEXT_PUBLIC_OPEN_TEAM_PRICE) || 0,
};

export default async function PaymentPage() {
  const profile = await getProfile();
  if (!profile) redirect(Path[2026].Onboarding);

  const team = await getMyTeam();
  if (!team) redirect(Path[2026].Dashboard);
  if (team.paid) redirect(Path[2026].Dashboard);

  const isCaptain = team.members.some(
    (m) => m.profile_id === profile.id && m.role === "captain",
  );
  if (!isCaptain) redirect(Path[2026].Dashboard);

  const minMembers = MEMBER_LIMITS[team.category].min;
  if (team.members.length < minMembers) redirect(Path[2026].Dashboard);

  const priceCents = ENTRY_FEES[team.category] || 0;

  return (
    <div className="flex min-h-screen flex-col items-center px-4 pt-12 pb-28">
      <div className="w-full max-w-lg">
        <GlassPanel>
          <PaymentForm
            teamName={team.name}
            category={team.category}
            memberCount={team.members.length}
            priceCents={priceCents}
          />
        </GlassPanel>
      </div>
    </div>
  );
}
