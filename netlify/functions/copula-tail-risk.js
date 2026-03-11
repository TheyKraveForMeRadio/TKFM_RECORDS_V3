import { supabase } from './supabase.js';

function gaussianCopula(rho) {
  const u = Math.random();
  const v = rho*u + Math.sqrt(1-rho*rho)*Math.random();
  return {u,v};
}

export async function handler() {

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('principal');

  const exposures = (loans||[]).map(l=>Number(l.principal||0));

  const rho = 0.35;
  let tailLoss = 0;

  exposures.forEach(EAD => {

    const {u,v} = gaussianCopula(rho);

    if(u<0.05 && v<0.05) {
      tailLoss += EAD * 0.5;
    }
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      tailLossEstimate:tailLoss,
      correlation:rho
    })
  };
}
