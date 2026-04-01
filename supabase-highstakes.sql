-- ROOMS (different stake levels)
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  entry_fee numeric DEFAULT 0,
  min_balance numeric DEFAULT 0,
  prize_pool numeric DEFAULT 0,
  created_at timestamp DEFAULT now()
);

-- USERS JOINING ROOMS
CREATE TABLE IF NOT EXISTS room_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text,
  room_id uuid,
  joined_at timestamp DEFAULT now()
);

-- JACKPOT POOL
CREATE TABLE IF NOT EXISTS jackpot (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount numeric DEFAULT 0,
  updated_at timestamp DEFAULT now()
);
