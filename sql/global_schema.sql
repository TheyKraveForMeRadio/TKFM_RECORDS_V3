-- Global Nodes
create table tkfm_global_nodes (
  id uuid primary key default gen_random_uuid(),
  city text,
  country text,
  node_email text unique,
  active boolean default true
);

-- Global Finance Streams
create table tkfm_finance_streams (
  id uuid primary key default gen_random_uuid(),
  node_id uuid references tkfm_global_nodes(id),
  revenue_source text,
  amount numeric,
  currency text,
  recorded_at timestamp default now()
);
