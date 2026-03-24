"use server";

import { auth } from "@clerk/nextjs/server";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import { SquareClient, SquareEnvironment } from "square";
import { MEMBER_LIMITS } from "@/app/2026/_data/teamConfig";

function getSquareClient() {
  const environment =
    process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox;

  return new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN,
    environment,
  });
}

function getEntryFeeAmountCents(
  category: "standard" | "open",
): number | null {
  const raw =
    category === "standard"
      ? process.env.NEXT_PUBLIC_STANDARD_TEAM_PRICE
      : process.env.NEXT_PUBLIC_OPEN_TEAM_PRICE;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export async function processPayment(
  sourceId: string,
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  const supabase = getSupabaseSecretClient();

  // Find user's profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("clerk_user_id", userId)
    .single();

  if (!profile) return { success: false, error: "Profile not found" };

  // Find user's team via membership
  const { data: membership } = await supabase
    .from("team_members")
    .select("team_id, role")
    .eq("profile_id", profile.id)
    .single();

  if (!membership) return { success: false, error: "You are not on a team" };
  if (membership.role !== "captain") {
    return { success: false, error: "Only the captain can pay" };
  }

  // Get team details
  const { data: team } = await supabase
    .from("teams")
    .select("id, name, category, paid")
    .eq("id", membership.team_id)
    .single();

  if (!team) return { success: false, error: "Team not found" };
  if (team.paid) return { success: false, error: "Team is already paid" };

  // Check minimum members
  const { count } = await supabase
    .from("team_members")
    .select("id", { count: "exact", head: true })
    .eq("team_id", team.id);

  const minMembers = MEMBER_LIMITS[team.category as keyof typeof MEMBER_LIMITS].min;
  if ((count ?? 0) < minMembers) {
    return {
      success: false,
      error: `Need at least ${minMembers} member${minMembers !== 1 ? "s" : ""} to activate`,
    };
  }

  const amountCents = getEntryFeeAmountCents(
    team.category as "standard" | "open",
  );
  if (!amountCents) {
    return { success: false, error: "Entry fee not configured" };
  }

  // Process payment with Square
  const square = getSquareClient();

  try {
    const response = await square.payments.create({
      sourceId,
      idempotencyKey: `team-${team.id}-${Date.now()}`,
      amountMoney: {
        amount: BigInt(amountCents),
        currency: "AUD",
      },
      locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
      note: `Sumobots 2026 entry fee — ${team.name} (${team.category})`,
      buyerEmailAddress: profile.email,
    });

    if (response.payment?.status === "COMPLETED") {
      // Record payment in history
      await supabase.from("payments").insert({
        team_id: team.id,
        square_payment_id: response.payment.id,
        amount_cents: amountCents,
        currency: "AUD",
        status: response.payment.status,
        source: "checkout",
      });

      // Mark team as paid
      const { error: updateError } = await supabase
        .from("teams")
        .update({ paid: true })
        .eq("id", team.id);

      if (updateError) {
        console.error("Payment succeeded but failed to update team:", updateError);
        return {
          success: false,
          error: "Payment processed but failed to activate team. Please contact an admin.",
        };
      }

      return { success: true };
    }

    return {
      success: false,
      error: "Payment was not completed. Please try again.",
    };
  } catch (err) {
    console.error("Square payment error:", err);
    return { success: false, error: "Payment failed. Please try again." };
  }
}
