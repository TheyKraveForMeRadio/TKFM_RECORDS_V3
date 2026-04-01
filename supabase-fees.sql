CREATE TABLE IF NOT EXISTS platform_fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text,          -- trade / investment
  amount numeric,
  created_at timestamp DEFAULT now()
);
