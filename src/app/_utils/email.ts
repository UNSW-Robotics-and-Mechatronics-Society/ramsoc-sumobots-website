"use server";

import { Resend } from "resend";
import { logError } from "./errorLog";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_ADDRESS =
  process.env.RESEND_FROM_ADDRESS || "Sumobots <noreply@sumobots.ramsocunsw.org>";

interface PaymentConfirmationParams {
  toEmail: string;
  teamName: string;
  category: string;
  amountCents: number;
  squarePaymentId: string;
}

export async function sendPaymentConfirmation({
  toEmail,
  teamName,
  category,
  amountCents,
  squarePaymentId,
}: PaymentConfirmationParams): Promise<void> {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping confirmation email");
    return;
  }

  const amount = `$${(amountCents / 100).toFixed(2)} AUD`;
  const categoryLabel = category === "standard" ? "Standard" : "Open";

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: toEmail,
      subject: `Payment confirmed — ${teamName} is registered for Sumobots 2026`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 16px;">
          <h1 style="font-size: 20px; margin-bottom: 24px;">Payment Confirmed</h1>
          <p>Your team <strong>${teamName}</strong> is now registered and active for RAMSoc Sumobots 2026.</p>

          <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666;">Team</td>
              <td style="padding: 8px 0; text-align: right;">${teamName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Category</td>
              <td style="padding: 8px 0; text-align: right;">${categoryLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Amount paid</td>
              <td style="padding: 8px 0; text-align: right;">${amount}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Reference</td>
              <td style="padding: 8px 0; text-align: right; font-size: 12px; font-family: monospace;">${squarePaymentId}</td>
            </tr>
          </table>

          <p style="font-size: 14px; color: #666;">
            You'll also receive a receipt from Square. If you have any questions,
            reach out to us on our socials or email.
          </p>

          <p style="font-size: 14px; margin-top: 24px;">Good luck! 🤖</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />
          <p style="font-size: 12px; color: #999;">
            UNSW Robotics &amp; Mechatronics Society — Sumobots 2026
          </p>
        </div>
      `,
    });
  } catch (err) {
    await logError("email", "Failed to send payment confirmation email", {
      toEmail,
      teamName,
      squarePaymentId,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
