CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  service TEXT,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);