"use server";

// Generates a short-lived Supabase signed upload URL so the browser can PUT
// the file directly to Supabase Storage without routing it through the
// Cloudflare Worker (which has a ~4 MB server-action body limit).
//
// Flow:
//   1. Client calls getUploadUrl(filename, contentType) — tiny request.
//   2. Server generates a UUID path + signed URL and returns both.
//   3. Client PUTs the file to signedUrl.
//   4. Client uses publicUrl as the stored image URL.
//
// Setup: create a PUBLIC bucket named "blog-images" in the Supabase dashboard.

import { auth } from "@clerk/nextjs/server";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";

const BUCKET = "blog-images";

export type UploadUrlResult = {
  signedUrl: string | null;
  publicUrl: string | null;
  error: string | null;
};

export async function getUploadUrl(
  filename: string,
  contentType: string,
): Promise<UploadUrlResult> {
  const { userId } = await auth();
  if (!userId) return { signedUrl: null, publicUrl: null, error: "Not authenticated" };

  const supabase = getSupabaseSecretClient();
  const ext = filename.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    return { signedUrl: null, publicUrl: null, error: error?.message ?? "Failed to create upload URL" };
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { signedUrl: data.signedUrl, publicUrl: urlData.publicUrl, error: null };
}
