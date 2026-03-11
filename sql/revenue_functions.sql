
create or replace function increment_artist_balance(
artist_id uuid,
amount numeric
)
returns void
language plpgsql
as $$

begin

insert into artist_balances (artist_id,balance)
values (artist_id,amount)

on conflict (artist_id)
do update set balance = artist_balances.balance + amount;

end;

$$;



create or replace function increment_platform_revenue(
amount numeric
)
returns void
language plpgsql
as $$

begin

insert into platform_revenue(amount)
values(amount);

end;

$$;

