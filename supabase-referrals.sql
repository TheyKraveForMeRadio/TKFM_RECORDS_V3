CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer text,
  referred text,
  created_at timestamp DEFAULT now()
);
