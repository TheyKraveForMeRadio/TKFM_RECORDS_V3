-- REFERRALS TRACKING
create table if not exists referral_logs (
  id uuid default gen_random_uuid() primary key,
  referrer text,
  referred text,
  created_at timestamp default now()
);

-- USER STATS
create table if not exists referral_stats (
  user_email text primary key,
  invites int default 0,
  rewards int default 0
);
