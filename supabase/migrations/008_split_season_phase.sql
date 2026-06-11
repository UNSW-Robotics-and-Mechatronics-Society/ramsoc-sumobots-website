-- Split season_phase into separate controls per registration category.
-- standard_phase locks Standard (UNSW-only) teams; open_phase locks Open teams.

ALTER TABLE app_config
  ADD COLUMN standard_phase TEXT NOT NULL DEFAULT 'preseason'
    CHECK (standard_phase IN ('preseason', 'midseason')),
  ADD COLUMN open_phase TEXT NOT NULL DEFAULT 'preseason'
    CHECK (open_phase IN ('preseason', 'midseason'));

-- Migrate existing value so nothing breaks on upgrade.
UPDATE app_config SET
  standard_phase = season_phase,
  open_phase     = season_phase;

ALTER TABLE app_config DROP COLUMN season_phase;
