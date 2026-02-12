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

-- AI credit usage log
create table tkfm_credit_usage (
  id uuid primary key default gen_random_uuid(),
  artist_email text references tkfm_artists(email),
  credit_type text,
  used_at timestamp default now(),
  notes text
);

-- Global culture / UN digital logging
create table tkfm_global_culture (
  id uuid primary key default gen_random_uuid(),
  label text,
  activity_type text,
  description text,
  created_at timestamp default now()
);

-- Seed example artist
insert into tkfm_artists (email, name, label_plan, subscription_active, credits)
values ('artist@example.com', 'DJ Krave', 'monthly_premium', true, '{"ai_drops_25": 10, "sponsor_read_20pack": 5}');
