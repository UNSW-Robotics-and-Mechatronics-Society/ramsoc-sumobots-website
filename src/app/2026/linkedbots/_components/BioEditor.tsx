"use client";

import { useRef, useState } from "react";
import { LuImagePlus, LuPencil } from "react-icons/lu";
import Card from "@/app/2026/_components/ui/Card";
import { Button } from "@/app/2026/_components/ui/Button";
import Input from "@/app/2026/_components/ui/Input";
import Badge from "@/app/2026/_components/ui/Badge";
import { TeamAvatar } from "./teamProfile";
import { getUploadUrl } from "../_utils/uploadImage";
import { updateBlogProfile } from "../_actions/blog";
import type { BlogTeamProfile } from "../_types";

/**
 * Edit the team's shared blog profile: avatar, robot name and bio.
 *
 * Starts collapsed when the profile already has a robot name; expands to the
 * full form when the user clicks "Edit profile". After saving it collapses
 * back automatically.
 */
export default function BioEditor({
  team,
  onSave,
}: {
  team: BlogTeamProfile;
  onSave: (updated: BlogTeamProfile) => void;
}) {
  const [editing, setEditing] = useState(!team.robotName);
  const [robotName, setRobotName] = useState(team.robotName);
  const [bio, setBio] = useState(team.bio);
  const [avatarUrl, setAvatarUrl] = useState(team.avatarUrl);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const dirty =
    robotName !== team.robotName ||
    bio !== team.bio ||
    avatarUrl !== team.avatarUrl;

  async function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { signedUrl, publicUrl, error } = await getUploadUrl(
      file.name,
      file.type,
    );
    if (signedUrl && publicUrl) {
      const res = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (res.ok) setAvatarUrl(publicUrl);
      else setError("Upload failed, please try again");
    } else {
      setError(error ?? "Couldn't start upload");
    }
    setUploading(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const res = await updateBlogProfile({ bio, avatarUrl, robotName });
    setSaving(false);
    if (!res.success) {
      setError(res.error ?? "Couldn't save profile");
      return;
    }
    onSave({ ...team, robotName, bio, avatarUrl });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setEditing(false);
    }, 1000);
  }

  // ── Collapsed view ──────────────────────────────────────────────────────────
  if (!editing) {
    return (
      <Card className="flex items-center gap-3 p-4">
        <TeamAvatar team={{ teamName: team.teamName, avatarUrl }} size={48} />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className="font-main truncate text-sm font-semibold text-white">
              {team.teamName}
            </span>
            <Badge variant={team.category === "open" ? "info" : "default"}>
              {team.category}
            </Badge>
          </div>
          <span className="font-main truncate text-xs text-rose-400">
            {robotName || "No robot name yet"}
          </span>
        </div>
        <Button variant="secondary" onClick={() => setEditing(true)}>
          <LuPencil className="h-4 w-4" />
          Edit profile
        </Button>
      </Card>
    );
  }

  // ── Expanded / editing view ─────────────────────────────────────────────────
  return (
    <Card className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Team profile</h3>
        {team.robotName && (
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="font-main text-xs text-gray-500 transition-colors hover:text-gray-300"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <TeamAvatar team={{ teamName: team.teamName, avatarUrl }} size={72} />
        <div>
          <Button
            variant="secondary"
            onClick={() => fileRef.current?.click()}
            loading={uploading}
          >
            <LuImagePlus className="h-4 w-4" />
            Change avatar
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatar}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-main text-sm text-muted-foreground">
          Team name
        </span>
        <div className="font-main flex items-center justify-between rounded-lg border border-input bg-white/5 px-3 py-2.5 text-sm text-gray-300">
          <span>{team.teamName}</span>
          <span className="text-xs text-gray-500">set at registration</span>
        </div>
      </div>

      <Input
        label="Robot name"
        value={robotName}
        onChange={(e) => setRobotName(e.target.value)}
        placeholder="e.g. The Anvil"
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="team-bio"
          className="font-main text-sm text-muted-foreground"
        >
          Bio
        </label>
        <textarea
          id="team-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          maxLength={240}
          placeholder="Tell people about your team and robot..."
          className="font-main rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        />
        <span className="font-main self-end text-xs text-gray-500">
          {bio.length}/240
        </span>
      </div>

      {error && <p className="font-main text-sm text-rose-400">{error}</p>}

      <Button
        onClick={handleSave}
        disabled={(!dirty && !saved) || saving}
        loading={saving}
        size="full"
      >
        {saved ? "Saved!" : "Save profile"}
      </Button>
    </Card>
  );
}
