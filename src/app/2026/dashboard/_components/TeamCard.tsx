import type { TeamWithMembers } from "@/app/_types/registration";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";

export default function TeamCard({ team }: { team: TeamWithMembers }) {
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
              {team.paid ? "Paid" : "Unpaid"}
            </Badge>
          </div>
        </div>
        <span className="font-main text-sm text-gray-400">
          {team.members.length} member{team.members.length !== 1 ? "s" : ""}
        </span>
      </div>
    </Card>
  );
}
