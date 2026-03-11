import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const capital =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('principal');

  const RWA =
    (loans||[]).reduce((s,l)=>s+Number(l.principal||0)*1.25,0);

  const CAR =
    RWA>0?(capital/RWA)*100:100;

  return {
    statusCode:200,
    body:JSON.stringify({
      reportDate:new Date().toISOString(),
      capital,
      riskWeightedAssets:RWA,
      capitalAdequacyRatio:CAR,
      baselCompliant:CAR>=8
    })
  };
}
