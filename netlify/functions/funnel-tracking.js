import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('funnel_events')
    .select('*');

  const stages = {
    visitors: 0,
    signups: 0,
    trials: 0,
    paid: 0
  };

  data?.forEach(e=>{
    if(stages[e.stage] !== undefined)
      stages[e.stage]++;
  });

  return {
    statusCode:200,
    body:JSON.stringify(stages)
  };
}
