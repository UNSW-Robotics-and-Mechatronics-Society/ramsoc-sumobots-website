import type { Profile } from "@/app/_types/registration";
import Card from "@/app/2026/_components/ui/Card";

export default function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Card>
      <h3 className="mb-3">Your Profile</h3>
      <div className="font-main grid grid-cols-2 gap-y-2 text-sm">
        <span className="text-gray-400">Name</span>
        <span className="text-white">{profile.full_name}</span>

        <span className="text-gray-400">Email</span>
        <span className="truncate text-white">{profile.email}</span>

        <span className="text-gray-400">University</span>
        <span className="text-white">
          {profile.is_unsw ? `UNSW (${profile.zid})` : profile.university}
        </span>

        {profile.degree && (
          <>
            <span className="text-gray-400">Degree</span>
            <span className="text-white">{profile.degree}</span>
          </>
        )}
      </div>
    </Card>
  );
}
