"use client";

import { useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import Card from "@/app/2026/_components/ui/Card";
import { Button } from "@/app/2026/_components/ui/Button";
import Input from "@/app/2026/_components/ui/Input";
import { TeamAvatar } from "./teamProfile";
import { uploadPostImage } from "../_utils/uploadImage";
import { updateBlogProfile } from "../_actions/blog";
import type { BlogTeamProfile } from "../_types";

/**
 * Edit the team's shared blog profile: avatar, robot name and bio.
 *
 * The team name is fixed (sourced from `teams.name`) and shown read-only — it
 * is never sent to `updateBlogProfile`. Any member of the team can save here.
 */
export default function BioEditor({
  team,
  onSave,
}: {
  team: BlogTeamProfile;
  onSave: (updated: BlogTeamProfile) => void;
}) {
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
    const fd = new FormData();
    fd.append("file", file);
    const { url } = await uploadPostImage(fd);
    if (url) setAvatarUrl(url);
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
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <Card className="flex flex-col gap-5">
      <h3 className="text-lg font-semibold text-white">Team profile</h3>

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

      {error && (
        <p className="font-main text-sm text-rose-400">{error}</p>
      )}

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
