"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { LuImagePlus, LuUploadCloud, LuX } from "react-icons/lu";
import Card from "@/app/2026/_components/ui/Card";
import { Button } from "@/app/2026/_components/ui/Button";
import { getUploadUrl } from "../_utils/uploadImage";
import type { BlogPost, BlogTeamProfile } from "../_types";

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
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    const { signedUrl, publicUrl } = await getUploadUrl(file.name, file.type);
    if (signedUrl && publicUrl) {
      const res = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (res.ok) setImageUrl(publicUrl);
    }
    setUploading(false);
  }

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  }

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) await uploadFile(file);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
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
        rows={4}
        maxLength={500}
        placeholder="What's new with your robot?"
        className="font-main rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
      />

      {/* Image preview */}
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

      {/* Drag-and-drop zone (only when no image yet) */}
      {!imageUrl && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed py-6 text-center transition-colors ${
            dragging
              ? "border-rose-400 bg-rose-500/10 text-rose-300"
              : "border-white/15 bg-white/[0.02] text-gray-500 hover:border-white/30 hover:text-gray-300"
          }`}
        >
          {uploading ? (
            <span className="font-main text-xs">Uploading…</span>
          ) : (
            <>
              <LuUploadCloud className="h-6 w-6" />
              <span className="font-main text-xs">
                Drag & drop a photo or{" "}
                <span className="text-rose-400 underline">browse</span>
              </span>
              <span className="font-main text-[10px] text-gray-600">
                Optional — posts without photos are totally fine
              </span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImage}
      />

      <div className="flex items-center gap-2">
        {imageUrl && (
          <Button
            variant="secondary"
            onClick={() => fileRef.current?.click()}
            loading={uploading}
          >
            <LuImagePlus className="h-4 w-4" />
            Replace photo
          </Button>
        )}
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
