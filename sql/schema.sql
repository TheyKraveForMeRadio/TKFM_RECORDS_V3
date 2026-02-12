-- Artists table
create table tkfm_artists (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  label_plan text,        -- 'monthly_basic', 'monthly_premium'
  subscription_active boolean default false,
  credits jsonb default '{}' -- { ai_drops_25: 0, sponsor_read_20pack: 0 }
);

-- Radio plays table
create table tkfm_radio_plays (
  id uuid primary key default gen_random_uuid(),
  track_name text,
  artist_email text references tkfm_artists(email),
  played_at timestamp default now()
);

-- AI usage / credit usage log
create table tkfm_credit_usage (
  id uuid primary key default gen_random_uuid(),
  artist_email text references tkfm_artists(email),
  credit_type text,
  used_at timestamp default now(),
  notes text
);

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
