ALTER TABLE advanced_orders
ADD COLUMN IF NOT EXISTS take_profit numeric,
ADD COLUMN IF NOT EXISTS trailing_percent numeric,
ADD COLUMN IF NOT EXISTS highest_price numeric,
ADD COLUMN IF NOT EXISTS lowest_price numeric;
