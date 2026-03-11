import { supabase } from './supabase.js';

export async function handler() {

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('entity_id, principal');

  const exposures = (loans||[]).map(l => {

    const PD = 0.05;        // 5% default probability baseline
    const LGD = 0.45;       // 45% loss severity
    const EAD = Number(l.principal||0);

    const expectedLoss = PD*LGD*EAD;

    return {
      entity_id:l.entity_id,
      PD,
      LGD,
      EAD,
      expectedLoss
    };
  });

  const totalExpectedLoss =
    exposures.reduce((s,e)=>s+e.expectedLoss,0);

  return {
    statusCode:200,
    body:JSON.stringify({
      exposures,
      totalExpectedLoss
    })
  };
}
