import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('payout_line_items')
    .select('*');

  const monthly = {};

  for (const row of data || []) {
    const month = row.created_at.slice(0,7);
    if (!monthly[month]) monthly[month] = 0;
    monthly[month] += Number(row.amount);
  }

  const months = Object.keys(monthly).sort();
  const values = months.map(m => monthly[m]);

  const avg = values.reduce((a,b)=>a+b,0) / (values.length || 1);

  const projectedAnnual = avg * 12;

  return {
    statusCode: 200,
    body: JSON.stringify({
      monthly,
      average_monthly: avg,
      projected_annual_revenue: projectedAnnual
    })
  };
}
