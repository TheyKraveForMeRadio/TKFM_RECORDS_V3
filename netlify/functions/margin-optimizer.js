import { supabase } from './supabase.js';

export async function handler() {

  const { data: revenue } =
    await supabase.from('revenue_events').select('*');

  const { data: expenses } =
    await supabase.from('expenses').select('*');

  const totalRevenue =
    revenue?.reduce((s,r)=>s+(r.amount||0),0) || 0;

  const totalExpenses =
    expenses?.reduce((s,e)=>s+(e.amount||0),0) || 0;

  const grossMargin =
    totalRevenue > 0
      ? ((totalRevenue-totalExpenses)/totalRevenue)*100
      : 0;

  return {
    statusCode:200,
    body:JSON.stringify({
      totalRevenue,
      totalExpenses,
      grossMargin
    })
  };
}
