CREATE TABLE IF NOT EXISTS kyc (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text,
  full_name text,
  document_url text,
  status text DEFAULT 'pending',
  created_at timestamp DEFAULT now()
);
