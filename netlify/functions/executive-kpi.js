import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entities')
    .select('*');

  const { data: deals } = await supabase
    .from('sales_pipeline')
    .select('*');

  const { data: revenue } = await supabase
    .from('revenue_events')
    .select('*');

  const totalRevenue =
    revenue?.reduce((sum,r)=>sum+(r.amount||0),0) || 0;

  const activeClients =
    entities?.filter(e=>e.active).length || 0;

  const openDeals =
    deals?.filter(d=>d.stage!=='signed').length || 0;

  const signedDeals =
    deals?.filter(d=>d.stage==='signed').length || 0;

  return {
    statusCode:200,
    body:JSON.stringify({
      totalRevenue,
      activeClients,
      openDeals,
      signedDeals
    })
  };
}
