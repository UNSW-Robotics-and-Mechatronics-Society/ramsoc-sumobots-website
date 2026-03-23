import type { TeamMember, Profile } from "@/app/_types/registration";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";

type MemberWithProfile = TeamMember & { profile: Profile };

export default function MemberList({
  members,
}: {
  members: MemberWithProfile[];
}) {
  return (
    <Card>
      <h3 className="mb-3">Members</h3>
      <ul className="flex flex-col gap-3">
        {members.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="font-main truncate text-sm text-white">
                {member.profile.full_name}
              </p>
              <p className="font-main truncate text-xs text-gray-400">
                {member.profile.university}
              </p>
            </div>
            {member.role === "captain" && (
              <Badge variant="captain">Captain</Badge>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
