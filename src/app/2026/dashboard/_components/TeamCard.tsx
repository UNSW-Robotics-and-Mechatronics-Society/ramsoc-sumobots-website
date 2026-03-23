import type { TeamWithMembers } from "@/app/_types/registration";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";

const MIN_MEMBERS_TO_ACTIVATE = 3;

export default function TeamCard({ team }: { team: TeamWithMembers }) {
  const canActivate = !team.paid && team.members.length >= MIN_MEMBERS_TO_ACTIVATE;
  const needsMoreMembers = !team.paid && team.members.length < MIN_MEMBERS_TO_ACTIVATE;
  const membersNeeded = MIN_MEMBERS_TO_ACTIVATE - team.members.length;

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="mb-1">{team.name}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="info">
              {team.category === "standard" ? "Standard" : "Open"}
            </Badge>
            <Badge variant={team.paid ? "success" : "warning"}>
              {team.paid ? "Active" : "Not Active"}
            </Badge>
          </div>
        </div>
        <span className="font-main text-sm text-gray-400">
          {team.members.length} member{team.members.length !== 1 ? "s" : ""}
        </span>
      </div>

      {!team.paid && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="font-main mb-3 text-center text-sm text-gray-400">
            Team is not currently active. Pay the entry fee to activate your team.
          </p>
          <Button
            size="full"
            disabled={!canActivate}
            className={canActivate ? "" : "cursor-not-allowed"}
          >
            Pay Entry Fee
          </Button>
          {needsMoreMembers && (
            <p className="font-main mt-2 text-center text-xs text-gray-500">
              Need {membersNeeded} more member{membersNeeded !== 1 ? "s" : ""} to activate (minimum {MIN_MEMBERS_TO_ACTIVATE})
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
