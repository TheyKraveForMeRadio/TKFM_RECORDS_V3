import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entities')
    .select('*');

  const allocations = [];

  for (const entity of entities || []) {

    const { data: revenue } = await supabase
      .from('platform_ledger')
      .select('amount')
      .eq('entity_id', entity.id)
      .eq('event_type','invoice.paid');

    const totalRevenue =
      (revenue||[]).reduce((s,r)=>s+Number(r.amount||0),0);

    const growthScore = Math.random(); // placeholder
    const marginScore = 0.7;

    const capitalWeight =
      totalRevenue * growthScore * marginScore;

    allocations.push({
      entity:entity.slug,
      capitalWeight
    });
  }

  allocations.sort((a,b)=>b.capitalWeight-a.capitalWeight);

  return {
    statusCode:200,
    body:JSON.stringify({
      allocationPriority:allocations
    })
  };
}
