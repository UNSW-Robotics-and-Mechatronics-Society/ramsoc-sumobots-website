import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import { logError } from "@/app/_utils/errorLog";

const WEBHOOK_SIGNATURE_KEY = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY ?? "";
const WEBHOOK_URL = process.env.SQUARE_WEBHOOK_URL ?? "";

function isValidSignature(
  body: string,
  signatureHeader: string,
  webhookUrl: string,
  signatureKey: string,
): boolean {
  const combined = webhookUrl + body;
  const expectedSignature = createHmac("sha256", signatureKey)
    .update(combined)
    .digest("base64");
  return expectedSignature === signatureHeader;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-square-hmacsha256-signature") ?? "";

  if (
    !WEBHOOK_SIGNATURE_KEY ||
    !isValidSignature(body, signature, WEBHOOK_URL, WEBHOOK_SIGNATURE_KEY)
  ) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const event = JSON.parse(body);

  if (event.type !== "payment.updated") {
    return NextResponse.json({ received: true });
  }

  const payment = event.data?.object?.payment;
  if (!payment?.id || payment.status !== "COMPLETED") {
    return NextResponse.json({ error: "No payment data" }, { status: 400 });
  }

  const supabase = getSupabaseSecretClient();

  // Check if we already recorded this payment (from checkout flow)
  const { data: existing } = await supabase
    .from("payments")
    .select("id")
    .eq("square_payment_id", payment.id)
    .maybeSingle();

  if (existing) {
    // Already recorded — just ensure team is marked paid
    const { data: paymentRecord } = await supabase
      .from("payments")
      .select("team_id")
      .eq("square_payment_id", payment.id)
      .single();

    if (paymentRecord) {
      await supabase
        .from("teams")
        .update({ paid: true })
        .eq("id", paymentRecord.team_id);
    }

    return NextResponse.json({ received: true, action: "ensured_paid" });
  }

  // Payment not recorded yet — extract team ID from the note field
  // Note format: "Sumobots 2026 entry fee — TeamName (category) [team:uuid]"
  const note: string = payment.note ?? "";
  const teamIdMatch = note.match(/\[team:([a-f0-9-]+)\]$/);

  if (!teamIdMatch) {
    await logError("webhook", "Could not parse team ID from payment note", {
      note,
      squarePaymentId: payment.id,
    });
    return NextResponse.json({ received: true, action: "skipped_no_match" });
  }

  const { data: team } = await supabase
    .from("teams")
    .select("id")
    .eq("id", teamIdMatch[1])
    .maybeSingle();

  if (!team) {
    await logError("webhook", "Team not found for payment", {
      teamId: teamIdMatch[1],
      squarePaymentId: payment.id,
    });
    return NextResponse.json({ received: true, action: "skipped_no_team" });
  }

  // Record the payment with full Square response
  const amountCents = Number(payment.amountMoney?.amount ?? 0);
  await supabase.from("payments").insert({
    team_id: team.id,
    square_payment_id: payment.id,
    amount_cents: amountCents,
    currency: payment.amountMoney?.currency ?? "AUD",
    status: payment.status,
    source: "webhook",
    square_response: payment,
  });

  // Mark team as paid
  await supabase
    .from("teams")
    .update({ paid: true })
    .eq("id", team.id);

  return NextResponse.json({ received: true, action: "payment_recorded" });
}
