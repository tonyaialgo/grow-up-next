-- Create sync_logs table to track school data sync history
CREATE TABLE IF NOT EXISTS sync_logs (
  id BIGSERIAL PRIMARY KEY,
  sync_type TEXT NOT NULL DEFAULT 'schools',
  status TEXT NOT NULL CHECK (status IN ('success', 'failed')),
  total_records INTEGER,
  removed_records INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  elapsed_seconds NUMERIC(10,1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create index for faster queries
CREATE INDEX IF NOT EXISTS idx_sync_logs_created_at ON sync_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sync_logs_status ON sync_logs(status);

-- RLS
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

-- Allow admin access (service role bypasses RLS, but for completeness):
CREATE POLICY "Service role full access to sync_logs"
  ON sync_logs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
