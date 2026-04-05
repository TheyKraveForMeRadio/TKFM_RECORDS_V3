CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text,
  message text,
  read boolean DEFAULT false,
  created_at timestamp DEFAULT now()
);
