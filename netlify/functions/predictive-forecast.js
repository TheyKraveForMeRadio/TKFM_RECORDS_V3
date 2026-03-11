import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('platform_ledger')
    .select('amount, created_at')
    .eq('event_type', 'invoice.paid')
    .order('created_at', { ascending: true });

  if (!data || data.length === 0) {
    return {
      statusCode:200,
      body:JSON.stringify({ error:"No revenue data yet" })
    };
  }

  const last90 = data.slice(-90);

  const total90 = last90.reduce((sum, r) =>
    sum + Number(r.amount || 0), 0);

  const avgDaily = total90 / 90;

  const projected30 = avgDaily * 30;
  const projected90 = avgDaily * 90;
  const projectedYear = projected30 * 12;

  return {
    statusCode:200,
    body:JSON.stringify({
      avgDailyRevenue: avgDaily,
      projected30Days: projected30,
      projected90Days: projected90,
      projectedARR: projectedYear
    })
  };
}
