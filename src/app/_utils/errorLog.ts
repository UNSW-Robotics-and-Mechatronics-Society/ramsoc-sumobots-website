import { getSupabaseSecretClient } from "./supabase";

/**
 * Log an error to the error_logs table for structured monitoring.
 * Fire-and-forget — never throws so it won't mask the original error.
 */
export async function logError(
  source: string,
  message: string,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  try {
    const supabase = getSupabaseSecretClient();
    await supabase.from("error_logs").insert({ source, message, metadata });
  } catch {
    // Last-resort fallback so error logging never crashes the caller
    console.error("[logError] Failed to write to error_logs:", {
      source,
      message,
      metadata,
    });
  }
}
