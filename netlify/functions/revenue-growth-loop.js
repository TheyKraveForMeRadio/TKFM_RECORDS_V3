import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('revenue_events')
    .select('*');

  const monthly = {};

  data?.forEach(r=>{
    const month =
      new Date(r.created_at).toISOString().slice(0,7);

    monthly[month] =
      (monthly[month] || 0) + r.amount;
  });

  const months = Object.keys(monthly).sort();

  let growth = [];

  for(let i=1;i<months.length;i++){
    const prev = monthly[months[i-1]];
    const curr = monthly[months[i]];

    const rate = prev > 0
      ? ((curr-prev)/prev)*100
      : 0;

    growth.push({
      month:months[i],
      growthRate:rate.toFixed(2)+"%"
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify(growth)
  };
}
