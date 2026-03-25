-- Add column to store the full Square API response for audit/debugging
ALTER TABLE payments ADD COLUMN square_response JSONB;
