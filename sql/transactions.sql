create table if not exists transactions (

id uuid primary key default uuid_generate_v4(),

catalog_id uuid,

artist_id uuid,

amount numeric,

artist_share numeric,

platform_fee numeric,

stripe_session text,

created_at timestamp default now()

);
