CREATE TABLE IF NOT EXISTS tournament_pnl (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text,
  season_id uuid,
  pnl numeric DEFAULT 0,
  created_at timestamp DEFAULT now()
);
