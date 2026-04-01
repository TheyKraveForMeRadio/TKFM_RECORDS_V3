ALTER TABLE users
ADD COLUMN IF NOT EXISTS plan text DEFAULT 'basic';

CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  price numeric,
  features jsonb,
  created_at timestamp DEFAULT now()
);
