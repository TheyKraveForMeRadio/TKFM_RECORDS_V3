ALTER TABLE users
ADD COLUMN IF NOT EXISTS vip boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS vip_expires timestamp;

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text,
  plan text,
  amount numeric,
  status text DEFAULT 'active',
  created_at timestamp DEFAULT now()
);
