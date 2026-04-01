-- FUND ACCOUNTS (each trader becomes a fund)
CREATE TABLE IF NOT EXISTS funds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trader text,
  total_value numeric DEFAULT 0,
  created_at timestamp DEFAULT now()
);

-- INVESTORS
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor text,
  fund_id uuid,
  amount numeric,
  shares numeric,
  created_at timestamp DEFAULT now()
);
