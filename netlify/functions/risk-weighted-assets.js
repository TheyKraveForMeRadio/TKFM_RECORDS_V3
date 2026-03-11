import { supabase } from './supabase.js';

export async function handler() {

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('principal');

  const { data: receivables } = await supabase
    .from('platform_ledger')
    .select('amount')
    .eq('event_type','invoice.pending');

  const creditRisk =
    (loans||[]).reduce((s,l)=>s+Number(l.principal||0)*1.25,0);

  const operationalRisk =
    (receivables||[]).reduce((s,r)=>s+Number(r.amount||0)*0.15,0);

  const totalRWA =
    creditRisk + operationalRisk;

  return {
    statusCode:200,
    body:JSON.stringify({
      creditRisk,
      operationalRisk,
      totalRWA
    })
  };
}
