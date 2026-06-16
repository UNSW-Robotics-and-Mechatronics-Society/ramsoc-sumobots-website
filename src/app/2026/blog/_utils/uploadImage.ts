// ---------------------------------------------------------------------------
// SUPABASE STORAGE PLACEHOLDER
//
// This is a stub for image uploads. Right now it does NOT upload anything — it
// just reads the selected file into a local object URL so the UI can preview it
// immediately. Wire this up to a Supabase Storage bucket when ready.
//
// To implement for real:
//   1. Create a public bucket in Supabase, e.g. "robot-posts".
//   2. Add its public URL host to `next.config.ts` -> images.remotePatterns.
//   3. Replace the body below with something like:
//
//        "use server";
//        import { getSupabaseSecretClient } from "@/app/_utils/supabase";
//
//        export async function uploadPostImage(file: File, teamId: string) {
//          const supabase = getSupabaseSecretClient();
//          const path = `${teamId}/${crypto.randomUUID()}-${file.name}`;
//          const { error } = await supabase.storage
//            .from("robot-posts")
//            .upload(path, file, { upsert: false });
//          if (error) return { url: null, error: error.message };
//          const { data } = supabase.storage.from("robot-posts").getPublicUrl(path);
//          return { url: data.publicUrl, error: null };
//        }
//
//   4. Since File can't cross the server boundary directly, you'll likely call
//      this from a client component that POSTs FormData to a route handler, or
//      upload from the browser with a signed URL. Adjust the call sites in
//      `PostComposer.tsx` / `BioEditor.tsx` accordingly.
// ---------------------------------------------------------------------------

export type UploadResult = { url: string | null; error: string | null };

const BUCKET_PLACEHOLDER = "robot-posts"; // TODO: create this bucket in Supabase

/**
 * Placeholder upload. Returns a temporary local preview URL instead of a real
 * remote URL. The returned URL only lives for the current browser session.
 */
export async function uploadPostImage(file: File): Promise<UploadResult> {
  // eslint-disable-next-line no-console
  console.warn(
    `[uploadPostImage] Supabase Storage not wired up yet. ` +
      `Would upload "${file.name}" to bucket "${BUCKET_PLACEHOLDER}". ` +
      `Returning a local preview URL for now.`,
  );

  // Local-only preview so the UI has something to show.
  const url = typeof URL !== "undefined" ? URL.createObjectURL(file) : null;
  return { url, error: null };
}
