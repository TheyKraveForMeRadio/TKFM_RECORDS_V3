import { supabase } from './supabase.js';

export async function handler() {

  const { data: revenue } = await supabase
    .from('revenue_events')
    .select('*');

  const { data: deals } = await supabase
    .from('sales_pipeline')
    .select('*');

  const totalRevenue =
    revenue?.reduce((s,r)=>s+(r.amount||0),0) || 0;

  const signedDeals =
    deals?.filter(d=>d.stage==='signed').length || 0;

  const openDeals =
    deals?.filter(d=>d.stage!=='signed').length || 0;

  const report = {
    totalRevenue,
    signedDeals,
    openDeals,
    growthNarrative:
      totalRevenue > 100000
        ? "Strong revenue expansion."
        : "Growth acceleration required."
  };

  return {
    statusCode:200,
    body:JSON.stringify(report)
  };
}
