import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entities')
    .select('*');

  const ratings = [];

  for (const entity of entities || []) {

    const { data: balances } = await supabase
      .from('artist_balances')
      .select('available_balance')
      .eq('entity_id', entity.id);

    const liquidity =
      (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

    let rating = "D";

    if (liquidity > 500000) rating = "A";
    else if (liquidity > 200000) rating = "B";
    else if (liquidity > 50000) rating = "C";

    ratings.push({
      entity:entity.slug,
      liquidity,
      rating
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify(ratings)
  };
}
