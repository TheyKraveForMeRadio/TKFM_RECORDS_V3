import { supabase } from './supabase.js';

export async function handler() {

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // 1️⃣ MRR (invoice.paid events this month)
  const { data: monthlyRevenue } = await supabase
    .from('platform_ledger')
    .select('amount')
    .eq('event_type', 'invoice.paid')
    .gte('created_at', startOfMonth.toISOString());

  const MRR = (monthlyRevenue || [])
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);

  const ARR = MRR * 12;

  // 2️⃣ Total Revenue (all-time)
  const { data: totalRevenueData } = await supabase
    .from('platform_ledger')
    .select('amount')
    .eq('event_type', 'invoice.paid');

  const totalRevenue = (totalRevenueData || [])
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);

  // 3️⃣ Estimated Monthly Burn (static placeholder for now)
  const MONTHLY_BURN = 5000; // replace later with real expense table

  const runwayMonths =
    MONTHLY_BURN > 0 ? totalRevenue / MONTHLY_BURN : 0;

  return {
    statusCode: 200,
    body: JSON.stringify({
      MRR,
      ARR,
      totalRevenue,
      monthlyBurn: MONTHLY_BURN,
      runwayMonths
    })
  };
}
