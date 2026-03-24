"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "@/app/2026/_components/ui/Button";
import { processPayment } from "@/app/2026/_actions/payment";

/* ------------------------------------------------------------------ */
/*  Square Web Payments SDK types (minimal subset)                    */
/* ------------------------------------------------------------------ */
interface SquarePayments {
  card: () => Promise<SquareCard>;
}

interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
  destroy: () => void;
}

interface SquareGlobal {
  payments: (appId: string, locationId: string) => Promise<SquarePayments>;
}

declare global {
  interface Window {
    Square?: SquareGlobal;
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
const SQUARE_SDK_URL =
  process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production"
    ? "https://web.squarecdn.com/v1/square.js"
    : "https://sandbox.web.squarecdn.com/v1/square.js";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function PaymentModal({
  open,
  onClose,
  priceCents,
  category,
}: {
  open: boolean;
  onClose: () => void;
  priceCents: number;
  category: "standard" | "open";
}) {
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const cardRef = useRef<SquareCard | null>(null);
  const router = useRouter();

  const initCard = useCallback(async () => {
    if (!window.Square) return;
    try {
      const payments = await window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
      );
      const card = await payments.card();
      await card.attach("#square-card-container");
      cardRef.current = card;
      setLoading(false);
    } catch {
      setError("Failed to load payment form. Please refresh and try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    // Load Square SDK script if not already present
    const existingScript = document.querySelector(
      `script[src="${SQUARE_SDK_URL}"]`,
    );
    if (existingScript && window.Square) {
      initCard();
      return;
    }

    const script = document.createElement("script");
    script.src = SQUARE_SDK_URL;
    script.onload = () => initCard();
    script.onerror = () => {
      setError("Failed to load Square. Please check your connection.");
      setLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      cardRef.current?.destroy();
      cardRef.current = null;
    };
  }, [open, initCard]);

  async function handlePay() {
    if (!cardRef.current) return;

    setProcessing(true);
    setError(undefined);

    try {
      const result = await cardRef.current.tokenize();

      if (result.status !== "OK" || !result.token) {
        setError(
          result.errors?.[0]?.message ?? "Card could not be processed.",
        );
        setProcessing(false);
        return;
      }

      const response = await processPayment(result.token);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          router.refresh();
        }, 1500);
      } else {
        setError(response.error ?? "Payment failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
        {success ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="text-4xl">&#10003;</span>
            <h3 className="text-lg text-white">Payment Successful!</h3>
            <p className="font-main text-sm text-gray-400">
              Your team is now active.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg text-white">Pay Entry Fee</h3>
                <p className="font-main text-sm text-gray-400">
                  {category === "standard" ? "Standard" : "Open"} team &mdash;{" "}
                  {formatPrice(priceCents)}
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={processing}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              id="square-card-container"
              className="mb-4 min-h-[90px] rounded-lg"
            >
              {loading && (
                <div className="font-main flex h-[90px] items-center justify-center text-sm text-gray-500">
                  Loading payment form&hellip;
                </div>
              )}
            </div>

            {error && (
              <p className="font-main mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <Button
              size="full"
              onClick={handlePay}
              disabled={loading || processing}
            >
              {processing ? "Processing…" : `Pay ${formatPrice(priceCents)}`}
            </Button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
