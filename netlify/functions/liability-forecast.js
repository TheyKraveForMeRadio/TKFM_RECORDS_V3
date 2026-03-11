import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('*');

  let totalOutstanding = 0;
  let projectedPayout = 0;

  for (const a of balances || []) {
    totalOutstanding += Number(a.available_balance || 0);
    if (a.available_balance >= 100) {
      projectedPayout += Number(a.available_balance);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      total_outstanding_liability: totalOutstanding,
      projected_next_payout: projectedPayout
    })
  };
}
