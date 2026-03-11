import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('principal');

  const assets =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const liabilities =
    (loans||[]).reduce((s,l)=>s+Number(l.principal||0),0);

  const equity = assets - liabilities;

  const projection = {
    nextQuarterAssets:assets*1.05,
    nextQuarterLiabilities:liabilities*1.02
  };

  return {
    statusCode:200,
    body:JSON.stringify({
      current:{assets,liabilities,equity},
      projection
    })
  };
}
