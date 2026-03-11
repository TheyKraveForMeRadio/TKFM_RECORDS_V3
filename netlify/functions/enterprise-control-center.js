import { supabase } from './supabase.js';

export async function handler() {

  const { data: revenue } = await supabase.from('revenue_events').select('*');
  const { data: entities } = await supabase.from('entities').select('*');
  const { data: deals } = await supabase.from('sales_pipeline').select('*');

  const totalRevenue =
    revenue?.reduce((s,r)=>s+(r.amount||0),0) || 0;

  const activeEntities =
    entities?.filter(e=>e.active).length || 0;

  const pipelineValue =
    deals?.reduce((s,d)=>s+(d.deal_value||0),0) || 0;

  return {
    statusCode:200,
    body:JSON.stringify({
      totalRevenue,
      activeEntities,
      pipelineValue
    })
  };
}
