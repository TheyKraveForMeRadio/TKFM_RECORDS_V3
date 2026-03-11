import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('platform_ledger')
    .select('amount, created_at')
    .eq('event_type','invoice.paid')
    .order('created_at',{ ascending:true });

  if (!data || data.length < 2) {
    return { statusCode:200, body:JSON.stringify({ growthRate:0 }) };
  }

  const mid = Math.floor(data.length/2);

  const firstHalf = data.slice(0, mid)
    .reduce((sum,r)=>sum+Number(r.amount||0),0);

  const secondHalf = data.slice(mid)
    .reduce((sum,r)=>sum+Number(r.amount||0),0);

  const growthRate =
    firstHalf > 0 ? ((secondHalf - firstHalf)/firstHalf)*100 : 0;

  return {
    statusCode:200,
    body:JSON.stringify({ growthRate: growthRate.toFixed(2) })
  };
}
