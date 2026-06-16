"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { LuImagePlus, LuX } from "react-icons/lu";
import Card from "@/app/2026/_components/ui/Card";
import { Button } from "@/app/2026/_components/ui/Button";
import { uploadPostImage } from "../_utils/uploadImage";
import type { BlogPost, BlogTeamProfile } from "../_types";

/**
 * Compose a new post (or edit an existing one when `editing` is provided).
 *
 * NOTE: front-end only. `onSubmit` updates local state in the parent. Swap it
 * for `createPost` / `updatePost` server actions when the backend is ready.
 */
export default function PostComposer({
  team,
  editing,
  onSubmit,
  onCancel,
}: {
  team: BlogTeamProfile;
  editing?: BlogPost;
  onSubmit: (data: { caption: string; imageUrl: string | null }) => void;
  onCancel?: () => void;
}) {
  const [caption, setCaption] = useState(editing?.caption ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(
    editing?.imageUrl ?? null,
  );
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { url } = await uploadPostImage(file); // placeholder upload
    if (url) setImageUrl(url);
    setUploading(false);
  }

  function handleSubmit() {
    if (!caption.trim()) return;
    onSubmit({ caption: caption.trim(), imageUrl });
    if (!editing) {
      setCaption("");
      setImageUrl(null);
    }
  }

  return (
    <Card className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-white">
        {editing ? "Edit post" : `Post as ${team.teamName}`}
      </h3>

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        rows={3}
        maxLength={500}
        placeholder="What's new with your robot?"
        className="font-main rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
      />

      {imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
          <Image src={imageUrl} alt="Post preview" fill className="object-cover" />
          <button
            type="button"
            aria-label="Remove image"
            onClick={() => setImageUrl(null)}
            className="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 text-white transition-colors hover:bg-black"
          >
            <LuX className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={() => fileRef.current?.click()}
          loading={uploading}
        >
          <LuImagePlus className="h-4 w-4" />
          {imageUrl ? "Replace photo" : "Add photo"}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImage}
        />
        <div className="ml-auto flex items-center gap-2">
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSubmit} disabled={!caption.trim()}>
            {editing ? "Save changes" : "Post"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
