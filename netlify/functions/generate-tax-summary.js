import { supabase } from './supabase.js';

export async function handler(event) {

  const { email, year } = event.queryStringParameters;

  const { data: payouts } = await supabase
    .from('payout_line_items')
    .select('*')
    .eq('artist_email', email)
    .gte('created_at', `${year}-01-01`)
    .lte('created_at', `${year}-12-31`);

  let total = 0;

  for (const p of payouts || []) {
    total += Number(p.amount);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      year,
      total_paid: total,
      transactions: payouts
    })
  };
}
