import { supabase } from './supabase.js';

export async function handler() {

  const { data: batches } = await supabase
    .from('payout_batches')
    .select('*');

  const monthly = {};

  for (const b of batches || []) {
    const month = b.created_at.slice(0,7);
    if (!monthly[month]) monthly[month] = 0;
    monthly[month] += Number(b.total_amount);
  }

  const values = Object.values(monthly);
  const avgMonthlyBurn =
    values.reduce((a,b)=>a+b,0) / (values.length || 1);

  const { data: escrow } = await supabase
    .from('tax_escrow')
    .select('*');

  const totalEscrow =
    (escrow || []).reduce((a,b)=>a+Number(b.reserved_amount),0);

  const runwayMonths =
    avgMonthlyBurn > 0 ? totalEscrow / avgMonthlyBurn : 0;

  return {
    statusCode:200,
    body:JSON.stringify({
      avg_monthly_burn: avgMonthlyBurn,
      escrow_reserve: totalEscrow,
      runway_months: runwayMonths
    })
  };
}
