import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('principal');

  const capital =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const riskWeightedAssets =
    (loans||[]).reduce((s,l)=>s+Number(l.principal||0)*1.25,0);

  const CAR =
    riskWeightedAssets > 0
      ? (capital/riskWeightedAssets)*100
      : 100;

  return {
    statusCode:200,
    body:JSON.stringify({
      capital,
      riskWeightedAssets,
      capitalAdequacyRatio:CAR.toFixed(2),
      meetsBasel:CAR >= 8
    })
  };
}
