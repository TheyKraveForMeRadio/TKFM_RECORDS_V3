import { supabase } from './supabase.js';

export async function handler() {

  const taxRate = 0.25;

  const { data: payouts } = await supabase
    .from('payout_line_items')
    .select('*')
    .gte('created_at', new Date(new Date().getFullYear(), 0, 1));

  const year = new Date().getFullYear();
  const quarter = Math.floor((new Date().getMonth()) / 3) + 1;

  let totalReserved = 0;

  for (const p of payouts || []) {

    const reserveAmount = Number(p.amount) * taxRate;

    await supabase.from('treasury_reserves').insert({
      artist_email: p.artist_email,
      amount: reserveAmount,
      quarter: `Q${quarter}`,
      year
    });

    totalReserved += reserveAmount;
  }

  await supabase.from('treasury_summary')
    .upsert({
      total_reserved: totalReserved,
      total_paid: payouts.reduce((a,b)=>a+Number(b.amount),0),
      updated_at: new Date()
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      year,
      quarter,
      total_reserved: totalReserved
    })
  };
}
