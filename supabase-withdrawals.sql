CREATE TABLE IF NOT EXISTS withdrawals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text,
  amount numeric,
  status text DEFAULT 'pending',
  created_at timestamp DEFAULT now()
);
