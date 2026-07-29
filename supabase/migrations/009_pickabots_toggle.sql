-- Admin-controlled toggle to advertise the PickABots platform on the homepage.
-- When enabled, the homepage shows a banner linking teams/fans to PickABots
-- for today's match schedule and the fan voting competition.

ALTER TABLE app_config
  ADD COLUMN pickabots_enabled BOOLEAN NOT NULL DEFAULT false;
