import { supabase } from './supabase.js';

export async function handler(event) {

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const quarter = Math.floor(month / 3) + 1;

  const startMonth = (quarter - 1) * 3;
  const startDate = new Date(year, startMonth, 1).toISOString();
  const endDate = new Date(year, startMonth + 3, 0).toISOString();

  // Revenue (all payout line items)
  const { data: payouts } = await supabase
    .from('payout_line_items')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  const revenue = (payouts || []).reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // Total paid to artists
  const { data: payoutBatches } = await supabase
    .from('payout_batches')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  const totalPayouts = (payoutBatches || []).reduce((sum, p) => sum + Number(p.total_amount || 0), 0);

  // Escrow reserve
  const { data: escrow } = await supabase
    .from('tax_escrow')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  const escrowReserve = (escrow || []).reduce((sum, e) => sum + Number(e.reserved_amount || 0), 0);

  const grossMargin = revenue - totalPayouts;
  const netIncome = grossMargin - escrowReserve;

  return {
    statusCode: 200,
    body: JSON.stringify({
      revenue,
      payouts: totalPayouts,
      escrow_reserve: escrowReserve,
      gross_margin: grossMargin,
      net_income: netIncome
    })
  };
}
