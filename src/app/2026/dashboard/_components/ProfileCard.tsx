"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import type { Profile } from "@/app/_types/registration";
import Card from "@/app/2026/_components/ui/Card";
import { Button } from "@/app/2026/_components/ui/Button";
import EditProfileForm from "./EditProfileForm";

const GENDER_LABELS: Record<string, string> = {
  male: "Male",
  female: "Female",
  "non-binary": "Non-binary",
  "prefer-not-to-say": "Prefer not to say",
  other: "Other",
};

function ProfileRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <>
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </>
  );
}

export default function ProfileCard({ profile }: { profile: Profile }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <Card>
        <h3 className="mb-4">Edit Profile</h3>
        <EditProfileForm
          profile={profile}
          onCancel={() => setEditing(false)}
        />
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-4 flex items-center gap-4">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-12 w-12",
            },
          }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate leading-tight">{profile.full_name}</h3>
          <p className="font-main truncate text-sm text-gray-400">
            {profile.email}
          </p>
        </div>
        <Button
          variant="ghost"
          size="default"
          className="h-8 shrink-0 px-3 text-xs text-gray-400 hover:text-white"
          onClick={() => setEditing(true)}
        >
          Edit
        </Button>
      </div>
      <div className="font-main grid grid-cols-2 gap-y-2 text-sm">
        <ProfileRow
          label="University"
          value={
            profile.is_unsw ? `UNSW (${profile.zid})` : profile.university
          }
        />
        <ProfileRow label="Degree" value={profile.degree} />
        <ProfileRow label="Majors" value={profile.majors} />
        <ProfileRow label="Faculty" value={profile.faculty} />
        <ProfileRow label="Year" value={profile.year_of_study || ""} />
        <ProfileRow label="Degree Stage" value={profile.degree_stage || ""} />
        <ProfileRow label="Level" value={profile.undergrad_postgrad || ""} />
        <ProfileRow label="Student Type" value={profile.domestic_international || ""} />
        <ProfileRow
          label="Gender"
          value={
            profile.gender === "other" && profile.gender_other
              ? profile.gender_other
              : (GENDER_LABELS[profile.gender] ?? profile.gender)
          }
        />
        <ProfileRow label="RAMSoc" value={profile.is_ramsoc_member ? "Yes" : "No"} />
        <ProfileRow label="Arc" value={profile.is_arc_member ? "Yes" : "No"} />
        <ProfileRow label="Phone" value={profile.phone} />
      </div>
    </Card>
  );
}
