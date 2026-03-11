create table if not exists platform_revenue (

id uuid primary key default uuid_generate_v4(),

amount numeric,

created_at timestamp default now()

);
