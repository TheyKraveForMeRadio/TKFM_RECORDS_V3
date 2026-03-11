import { supabase } from './supabase.js';

export async function handler() {

  const { data: revenue } = await supabase
    .from('platform_ledger')
    .select('amount')
    .eq('event_type','invoice.paid');

  const totalRevenue = (revenue || [])
    .reduce((sum,r)=>sum+Number(r.amount||0),0);

  const monthlyBurnBase = 5000;
  const variableBurn = totalRevenue * 0.1;

  const monthlyBurn = monthlyBurnBase + variableBurn;

  const runway =
    monthlyBurn > 0 ? totalRevenue / monthlyBurn : 0;

  return {
    statusCode:200,
    body:JSON.stringify({
      monthlyBurn,
      runwayMonths: runway.toFixed(2)
    })
  };
}
