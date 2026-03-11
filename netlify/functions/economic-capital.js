import { supabase } from './supabase.js';

export async function handler() {

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('principal');

  const totalExposure =
    (loans||[]).reduce((s,l)=>s+Number(l.principal||0),0);

  const stressMultiplier = 3.0;

  const economicCapital =
    totalExposure * 0.05 * stressMultiplier;

  return {
    statusCode:200,
    body:JSON.stringify({
      totalExposure,
      economicCapitalRequired:economicCapital,
      confidenceLevel:"99.9%"
    })
  };
}
