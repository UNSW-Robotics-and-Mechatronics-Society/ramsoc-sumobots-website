"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import type { Profile } from "@/app/_types/registration";
import Card from "@/app/2026/_components/ui/Card";
import { Button } from "@/app/2026/_components/ui/Button";
import EditProfileForm from "./EditProfileForm";

const YEAR_LABELS: Record<number, string> = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year",
  5: "5th Year+",
  0: "Postgraduate",
};

const GENDER_LABELS: Record<string, string> = {
  male: "Male",
  female: "Female",
  "non-binary": "Non-binary",
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

export default function ProfileTab({
  profile,
  onLogout,
  onDeleteAccount,
}: {
  profile: Profile;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
}) {
  const clerk = useClerk();
  const [editing, setEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleLogout() {
    if (onLogout) {
      onLogout();
    } else {
      clerk.signOut();
    }
  }

  function handleDeleteAccount() {
    if (onDeleteAccount) {
      onDeleteAccount();
    } else {
      // In a real app, call a server action to delete the profile
      clerk.signOut();
    }
  }

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
    <div className="flex flex-col gap-5">
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3>Your Profile</h3>
          <Button
            variant="ghost"
            size="default"
            className="h-8 px-3 text-xs text-gray-400 hover:text-white"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        </div>
        <div className="font-main grid grid-cols-2 gap-y-2 text-sm">
          <ProfileRow label="Name" value={profile.full_name} />
          <ProfileRow label="Email" value={profile.email} />
          <ProfileRow
            label="University"
            value={
              profile.is_unsw ? `UNSW (${profile.zid})` : profile.university
            }
          />
          <ProfileRow label="Degree" value={profile.degree} />
          <ProfileRow label="Faculty" value={profile.faculty} />
          <ProfileRow
            label="Year"
            value={
              profile.year_of_study !== null
                ? (YEAR_LABELS[profile.year_of_study] ?? "")
                : ""
            }
          />
          <ProfileRow
            label="Gender"
            value={GENDER_LABELS[profile.gender] ?? profile.gender}
          />
          <ProfileRow label="Dietary" value={profile.dietary_requirements} />
          <ProfileRow label="Phone" value={profile.phone} />
        </div>
      </Card>

      {/* Logout */}
      <Card>
        {showLogoutConfirm ? (
          <div className="flex flex-col items-center gap-3">
            <p className="font-main text-sm text-gray-300">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="default"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                size="default"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="secondary"
            size="full"
            onClick={() => setShowLogoutConfirm(true)}
          >
            Log Out
          </Button>
        )}
      </Card>

      {/* Delete Account */}
      <Card>
        {showDeleteConfirm ? (
          <div className="flex flex-col items-center gap-3">
            <p className="font-main text-sm text-red-400">
              Are you sure? This will permanently delete your account and remove
              you from your team. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="default"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="default"
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="default"
              className="bg-red-900 text-white hover:bg-red-800"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete Account
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
