-- App-wide configuration per competition year.
-- season_phase controls whether team membership is locked (midseason).
-- Registration date fields replace the hardcoded values in registrationConfig.ts.

CREATE TABLE app_config (
  competition_year INT PRIMARY KEY,
  season_phase TEXT NOT NULL DEFAULT 'preseason'
    CHECK (season_phase IN ('preseason', 'midseason')),
  standard_closes TIMESTAMPTZ NOT NULL,
  open_closes TIMESTAMPTZ NOT NULL,
  payment_deadline TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed with 2026 defaults matching the previous hardcoded values.
INSERT INTO app_config (
  competition_year,
  season_phase,
  standard_closes,
  open_closes,
  payment_deadline
) VALUES (
  2026,
  'preseason',
  '2026-06-04T02:00:00+00:00',   -- 2026-06-04 12:00 AEST
  '2026-07-26T13:59:59+00:00',   -- 2026-07-26 23:59 AEST
  '2026-06-04T13:59:59+00:00'    -- 2026-06-04 23:59 AEST
);
