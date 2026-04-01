CREATE TABLE IF NOT EXISTS seasons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  start_date timestamp,
  end_date timestamp,
  prize_pool numeric DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);
