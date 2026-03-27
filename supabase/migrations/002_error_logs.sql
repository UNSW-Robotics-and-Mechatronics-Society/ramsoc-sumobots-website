CREATE TABLE error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,           -- e.g. 'payment', 'webhook', 'email'
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',    -- structured context (team_id, user_id, square_payment_id, etc.)
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_error_logs_source ON error_logs(source);
CREATE INDEX idx_error_logs_created_at ON error_logs(created_at DESC);
