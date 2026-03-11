import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } =
    await supabase.from('entities').select('*');

  const { data: spend } =
    await supabase.from('marketing_spend').select('*');

  const totalCustomers =
    entities?.length || 0;

  const totalSpend =
    spend?.reduce((s,m)=>s+(m.amount||0),0) || 0;

  const CAC =
    totalCustomers > 0
      ? totalSpend / totalCustomers
      : 0;

  return {
    statusCode:200,
    body:JSON.stringify({
      totalCustomers,
      totalSpend,
      CAC
    })
  };
}
