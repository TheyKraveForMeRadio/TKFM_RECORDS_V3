import { supabase } from './supabase.js';

export async function handler() {

  const { data: marketing } = await supabase
    .from('marketing_spend')
    .select('amount');

  const { data: entities } = await supabase
    .from('entities')
    .select('id');

  const totalSpend =
    (marketing||[]).reduce((s,m)=>s+Number(m.amount||0),0);

  const newCustomers = entities?.length || 1;

  const CAC = totalSpend / newCustomers;

  return {
    statusCode:200,
    body:JSON.stringify({
      totalSpend,
      newCustomers,
      CAC
    })
  };
}
