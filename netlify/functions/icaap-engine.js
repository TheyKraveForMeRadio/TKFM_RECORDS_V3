import { supabase } from './supabase.js';

export async function handler() {

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('principal');

  const totalExposure =
    (loans||[]).reduce((s,l)=>s+Number(l.principal||0),0);

  const operationalRisk = totalExposure * 0.1;
  const creditRisk = totalExposure * 0.05;
  const liquidityRisk = totalExposure * 0.08;

  const internalCapitalRequired =
    operationalRisk + creditRisk + liquidityRisk;

  return {
    statusCode:200,
    body:JSON.stringify({
      totalExposure,
      operationalRisk,
      creditRisk,
      liquidityRisk,
      internalCapitalRequired
    })
  };
}
