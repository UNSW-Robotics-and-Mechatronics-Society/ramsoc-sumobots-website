"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/2026/_components/ui/Button";
import { processPayment } from "@/app/2026/_actions/payment";
import Path from "@/app/path";

/* ------------------------------------------------------------------ */
/*  Square Web Payments SDK types                                     */
/* ------------------------------------------------------------------ */
interface TokenResult {
  status: string;
  token?: string;
  errors?: { message: string }[];
}

interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<TokenResult>;
  destroy: () => void;
}

interface SquareDigitalWallet {
  attach: (selector: string, options?: Record<string, unknown>) => Promise<void>;
  tokenize: () => Promise<TokenResult>;
  destroy: () => void;
  addEventListener: (
    event: string,
    callback: (event: { detail: { tokenResult: TokenResult } }) => void,
  ) => void;
}

interface PaymentRequestConfig {
  countryCode: string;
  currencyCode: string;
  total: { amount: string; label: string };
}

interface SquarePayments {
  card: (options?: Record<string, unknown>) => Promise<SquareCard>;
  applePay: (req: PaymentRequestConfig) => Promise<SquareDigitalWallet>;
  googlePay: (req: PaymentRequestConfig) => Promise<SquareDigitalWallet>;
  afterpayClearpay: (
    req: PaymentRequestConfig,
  ) => Promise<SquareDigitalWallet>;
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
export default function PaymentForm({
  teamName,
  category,
  memberCount,
  priceCents,
}: {
  teamName: string;
  category: string;
  memberCount: number;
  priceCents: number;
}) {
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [applePayAvailable, setApplePayAvailable] = useState(false);
  const [googlePayAvailable, setGooglePayAvailable] = useState(false);
  const [afterpayAvailable, setAfterpayAvailable] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const cardRef = useRef<SquareCard | null>(null);
  const applePayRef = useRef<SquareDigitalWallet | null>(null);
  const googlePayRef = useRef<SquareDigitalWallet | null>(null);
  const afterpayRef = useRef<SquareDigitalWallet | null>(null);
  const router = useRouter();

  const handleTokenResult = useCallback(
    async (result: TokenResult) => {
      if (result.status !== "OK" || !result.token) {
        setError(
          result.errors?.[0]?.message ?? "Payment could not be processed.",
        );
        setProcessing(false);
        return;
      }

      const response = await processPayment(result.token, {
        cardholderName: cardholderName.trim(),
        postalCode: postalCode.trim(),
      });

      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error ?? "Payment failed.");
      }
      setProcessing(false);
    },
    [cardholderName, postalCode],
  );

  const initPayments = useCallback(async () => {
    if (!window.Square || cardRef.current) return;
    try {
      const payments = await window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
      );

      const card = await payments.card({
        style: {
          ".input-container": {
            borderColor: "rgba(255,255,255,0.15)",
            borderRadius: "8px",
          },
          ".input-container.is-focus": {
            borderColor: "rgba(244,63,94,0.6)",
          },
          input: {
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "14px",
          },
          "input::placeholder": {
            color: "rgba(255,255,255,0.35)",
          },
          ".message-text": {
            color: "rgba(248,113,113,1)",
          },
          ".message-icon": {
            color: "rgba(248,113,113,1)",
          },
        },
      });
      await card.attach("#square-card-container");
      cardRef.current = card;

      const paymentRequest: PaymentRequestConfig = {
        countryCode: "AU",
        currencyCode: "AUD",
        total: {
          amount: (priceCents / 100).toFixed(2),
          label: `Sumobots ${category} entry fee`,
        },
      };

      try {
        const applePay = await payments.applePay(paymentRequest);
        // Apple Pay does NOT use attach() — it binds to a <button> element
        // with id="apple-pay-button" automatically via CSS styling
        applePayRef.current = applePay;
        setApplePayAvailable(true);
      } catch (e) {
        console.warn("[Square] Apple Pay not available:", e);
      }

      try {
        const googlePay = await payments.googlePay(paymentRequest);
        await googlePay.attach("#google-pay-container");
        googlePayRef.current = googlePay;
        setGooglePayAvailable(true);
      } catch (e) {
        console.warn("[Square] Google Pay not available:", e);
      }

      try {
        const afterpay = await payments.afterpayClearpay(paymentRequest);
        await afterpay.attach("#afterpay-container", {
          buttonColor: "black",
          buttonType: "buy_now_with_afterpay",
        });
        afterpayRef.current = afterpay;
        setAfterpayAvailable(true);
      } catch (e) {
        console.warn("[Square] Afterpay not available:", e);
      }

      setLoading(false);
    } catch {
      setError("Failed to load payment form. Please refresh and try again.");
      setLoading(false);
    }
  }, [priceCents, category]);

  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src="${SQUARE_SDK_URL}"]`,
    );
    if (existingScript && window.Square) {
      initPayments();
      return;
    }

    const script = document.createElement("script");
    script.src = SQUARE_SDK_URL;
    script.onload = () => initPayments();
    script.onerror = () => {
      setError("Failed to load Square. Please check your connection.");
      setLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      cardRef.current?.destroy();
      cardRef.current = null;
      applePayRef.current?.destroy();
      applePayRef.current = null;
      googlePayRef.current?.destroy();
      googlePayRef.current = null;
      afterpayRef.current?.destroy();
      afterpayRef.current = null;
    };
  }, [initPayments]);

  async function handleWalletPay(
    wallet: SquareDigitalWallet | null,
    label: string,
  ) {
    if (!wallet) return;
    setProcessing(true);
    setError(undefined);
    try {
      const result = await wallet.tokenize();
      await handleTokenResult(result);
    } catch {
      setError(`${label} payment failed. Please try again.`);
      setProcessing(false);
    }
  }

  async function handleCardPay() {
    if (!cardRef.current) return;
    if (!cardholderName.trim()) {
      setError("Please enter the cardholder name.");
      return;
    }
    setProcessing(true);
    setError(undefined);
    try {
      const result = await cardRef.current.tokenize();
      await handleTokenResult(result);
    } catch {
      setError("Something went wrong. Please try again.");
      setProcessing(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-5 py-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
          <svg
            className="h-10 w-10 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h2 className="font-display text-2xl text-white">Payment Successful</h2>
          <p className="font-main mt-2 text-gray-400">
            {teamName} is now registered and active. Good luck!
          </p>
        </div>
        <Link href={Path[2026].Dashboard}>
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <Link
        href={Path[2026].Dashboard}
        className="font-main inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to dashboard
      </Link>

      {/* Title */}
      <div>
        <h2 className="font-display text-2xl text-white">Pay Entry Fee</h2>
        <p className="font-main mt-1 text-sm text-gray-400">
          RAMSoc Sumobots 2026
        </p>
      </div>

      {/* Order summary */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h3 className="font-display mb-4 text-sm uppercase tracking-wider text-gray-400">
          Order Summary
        </h3>
        <div className="font-main text-sm">
          {/* Line item */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-white">
                1 &times; {category === "standard" ? "Standard" : "Open"} Team
                Registration
              </p>
              <p className="mt-0.5 truncate text-xs text-gray-500">
                {teamName} &middot; {memberCount} member
                {memberCount !== 1 ? "s" : ""}
              </p>
            </div>
            <span className="shrink-0 text-white">
              {formatPrice(priceCents)}
            </span>
          </div>

          {/* Totals */}
          <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>{formatPrice(priceCents)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Processing fee</span>
              <span>$0.00</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-white/10 pt-2">
              <span className="text-gray-300">Total</span>
              <span className="font-display text-2xl text-white">
                {formatPrice(priceCents)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/*
        Digital wallet buttons — containers MUST always be in the DOM for
        Square SDK attach(). We use overflow-hidden + h-0 instead of
        display:none so the SDK can still render its iframes.
      */}
      <div
        className={
          applePayAvailable || googlePayAvailable || afterpayAvailable
            ? "flex flex-col gap-3"
            : "pointer-events-none h-0 overflow-hidden"
        }
      >
        {/* Apple Pay — uses a native <button> styled via CSS, no attach() */}
        <button
          id="apple-pay-button"
          type="button"
          onClick={() => handleWalletPay(applePayRef.current, "Apple Pay")}
          disabled={processing}
          className={applePayAvailable ? "" : "hidden"}
          style={{
            WebkitAppearance: "-apple-pay-button" as never,
            appearance: "-apple-pay-button" as never,
            width: "100%",
            height: "48px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        />

        {/* Google Pay — SDK renders its button via attach() */}
        <div
          id="google-pay-container"
          className={
            googlePayAvailable
              ? "min-h-[48px] [&_button]:!rounded-lg"
              : "pointer-events-none h-0 overflow-hidden opacity-0"
          }
        />

        {/* Afterpay — SDK renders its button via attach() */}
        <div
          id="afterpay-container"
          className={
            afterpayAvailable
              ? "min-h-[48px] [&_button]:!rounded-lg"
              : "pointer-events-none h-0 overflow-hidden opacity-0"
          }
        />

        {(applePayAvailable || googlePayAvailable || afterpayAvailable) && (
          <div className="font-main my-1 flex items-center gap-3 text-xs text-gray-500">
            <div className="h-px flex-1 bg-white/10" />
            or pay with card
            <div className="h-px flex-1 bg-white/10" />
          </div>
        )}
      </div>

      {/* Cardholder details */}
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="cardholder-name"
            className="font-main mb-2 block text-sm text-gray-300"
          >
            Cardholder name
          </label>
          <input
            id="cardholder-name"
            type="text"
            autoComplete="cc-name"
            placeholder="Name on card"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="font-main w-full rounded-lg border border-white/15 bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-rose-500/60"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="font-main mb-2 block text-sm text-gray-300">
              Card details
            </label>
            <div id="square-card-container" className="min-h-[90px]">
              {loading && (
                <div className="font-main flex h-[90px] items-center justify-center text-sm text-gray-400">
                  Loading payment form&hellip;
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="billing-postcode"
              className="font-main mb-2 block text-sm text-gray-300"
            >
              Billing postcode
            </label>
            <input
              id="billing-postcode"
              type="text"
              autoComplete="postal-code"
              inputMode="numeric"
              placeholder="2000"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="font-main w-full rounded-lg border border-white/15 bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-rose-500/60"
            />
          </div>

          <div>
            <label className="font-main mb-2 block text-sm text-gray-300">
              Country
            </label>
            <div className="font-main flex h-[42px] items-center rounded-lg border border-white/15 bg-transparent px-3 text-sm text-gray-400">
              Australia
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="font-main rounded-lg bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Pay button */}
      <Button
        size="full"
        onClick={handleCardPay}
        disabled={loading || processing}
      >
        {processing ? "Processing…" : `Pay ${formatPrice(priceCents)}`}
      </Button>

      {/* Trust footer */}
      <div className="font-main flex items-center justify-center gap-2 text-xs text-gray-500">
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Secured by
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/2026/square-logo.svg"
          alt="Square"
          className="inline-block w-14 opacity-50"
        />
      </div>
    </div>
  );
}
