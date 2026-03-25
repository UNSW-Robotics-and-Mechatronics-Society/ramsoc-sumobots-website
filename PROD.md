# Production Cutover Checklist

Quick reference for swapping sandbox/dev to production Square & Clerk (and everything else).

---

## Square

- [ ] In [Square Dashboard](https://developer.squareup.com/apps), switch to **Production** credentials
- [ ] `SQUARE_ACCESS_TOKEN` — use production token (starts with `EAAAl...`, NOT `EAAAEy...`)
- [ ] `NEXT_PUBLIC_SQUARE_APPLICATION_ID` — use production app ID (`sq0idp-...`, NOT `sandbox-sq0idb-...`)
- [ ] `NEXT_PUBLIC_SQUARE_LOCATION_ID` — use a real production location ID
- [ ] `NEXT_PUBLIC_SQUARE_ENVIRONMENT=production` (currently `sandbox`)
- [ ] **Webhook**: create a new production webhook subscription in Square Dashboard
  - URL: `https://sumobots.ramsocunsw.org/api/square-webhook`
  - Event: `payment.updated`
  - Copy the new **Signature Key** to `SQUARE_WEBHOOK_SIGNATURE_KEY`
  - Set `SQUARE_WEBHOOK_URL` to the production URL above (must match exactly for HMAC validation)
- [ ] Confirm entry fee amounts are correct:
  - `NEXT_PUBLIC_STANDARD_TEAM_PRICE` = 10000 ($100.00)
  - `NEXT_PUBLIC_OPEN_TEAM_PRICE` = 6000 ($60.00)

## Clerk

- [ ] In [Clerk Dashboard](https://dashboard.clerk.com), switch to or create a **Production** instance
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — use production key (`pk_live_...`, NOT `pk_test_...`)
- [ ] `CLERK_SECRET_KEY` — use production key (`sk_live_...`, NOT `sk_test_...`)
- [ ] Set production domain in Clerk (e.g. `sumobots.ramsocunsw.org`)
- [ ] Verify OAuth providers (Google, etc.) are configured for production in Clerk
- [ ] Check redirect URLs still point to `/2026/...` paths

## Supabase

- [ ] `NEXT_PUBLIC_SUPABASE_URL` — confirm using production project URL
- [ ] `SUPABASE_SECRET_KEY` — confirm using production service-role key
- [ ] Run the migration on the production database:
  ```sql
  -- If starting fresh:
  -- Run the full 001_registration_schema.sql

  -- If tables already exist, just add the new columns:
  ALTER TABLE payments
    ADD COLUMN cardholder_name TEXT,
    ADD COLUMN billing_postcode TEXT;
  ```
- [ ] Enable RLS policies on all tables (`profiles`, `teams`, `team_members`, `payments`) — none are defined in the migration yet
- [ ] Confirm `admin_session` cookie auth for `/2026/admin/*` routes is acceptable for prod (see `src/middleware.ts`)
- [ ] Set a strong `ADMIN_PASSWORD`

## Error Logging

- [ ] Run migration `002_error_logs.sql` on the production database
- [ ] Periodically check the `error_logs` table for payment/webhook failures

## Cloudflare / Deployment

- [ ] Set all env vars above in Cloudflare Workers environment (or however secrets are managed)
- [ ] Verify `SUMOBOTS_WORKER_DOMAIN` in `src/app/constants.ts` points to production
- [ ] Confirm DNS is set up for `sumobots.ramsocunsw.org`

## Smoke Tests After Cutover

- [ ] Sign up / sign in works via Clerk
- [ ] Onboarding flow saves to Supabase
- [ ] Team creation + join code works
- [ ] Payment goes through with a real card (do a small refundable test)
- [ ] Webhook fires and marks team as paid (check Supabase `payments` table)
- [ ] Admin panel loads at `/2026/admin`

## Gotchas

- Sandbox Square cards (`4111 1111 1111 1111`) will **not** work in production
- Clerk test keys and live keys are **not** interchangeable — users created in test mode won't exist in production
- If you change the webhook URL even slightly, HMAC signature validation will fail (the URL is part of the HMAC input)
- The payment `note` field format (`[team:uuid]`) is used by the webhook to match payments to teams — don't change it
