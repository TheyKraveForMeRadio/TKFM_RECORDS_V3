import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const { data: escrow } = await supabase
    .from('tax_escrow')
    .select('reserved_amount');

  const tier1 =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const tier2 =
    (escrow||[]).reduce((s,e)=>s+Number(e.reserved_amount||0),0);

  const totalCapital = tier1 + tier2;

  return {
    statusCode:200,
    body:JSON.stringify({
      tier1,
      tier2,
      totalCapital,
      tier1Ratio:
        totalCapital>0?(tier1/totalCapital)*100:0
    })
  };
}
