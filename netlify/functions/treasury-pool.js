import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entities')
    .select('*');

  let totalLiquidity = 0;
  let breakdown = [];

  for (const entity of entities || []) {

    const { data: balances } = await supabase
      .from('artist_balances')
      .select('available_balance')
      .eq('entity_id', entity.id);

    const liquidity =
      (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

    totalLiquidity += liquidity;

    breakdown.push({
      entity:entity.slug,
      liquidity
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify({
      totalLiquidity,
      breakdown,
      pooledAt:new Date().toISOString()
    })
  };
}
