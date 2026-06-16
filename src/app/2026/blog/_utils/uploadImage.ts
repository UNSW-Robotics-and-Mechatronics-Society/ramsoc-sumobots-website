"use server";

// Uploads an image to the public Supabase Storage bucket "blog-images" and
// returns its public URL. Called from client components by POSTing FormData
// (a File can't cross the server-action boundary as a bare argument).
//
// Setup: create a PUBLIC bucket named "blog-images" in the Supabase dashboard.
// The bucket host is already allowed in next.config.ts -> images.remotePatterns.

import { auth } from "@clerk/nextjs/server";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";

export type UploadResult = { url: string | null; error: string | null };

const BUCKET = "blog-images";

export async function uploadPostImage(
  formData: FormData,
): Promise<UploadResult> {
  const { userId } = await auth();
  if (!userId) return { url: null, error: "Not authenticated" };

  const file = formData.get("file");
  if (!(file instanceof File)) return { url: null, error: "No file provided" };

  const supabase = getSupabaseSecretClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { url: null, error: error.message };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}
