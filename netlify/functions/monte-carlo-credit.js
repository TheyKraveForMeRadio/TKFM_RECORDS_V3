import { supabase } from './supabase.js';

function randomNormal() {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) *
         Math.cos(2.0 * Math.PI * v);
}

export async function handler() {

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('principal');

  const exposures = (loans||[]).map(l => Number(l.principal||0));

  const simulations = 5000;
  const losses = [];

  for(let i=0;i<simulations;i++) {

    let portfolioLoss = 0;

    exposures.forEach(EAD => {
      const PD = 0.05;
      const LGD = 0.45;

      const shock = randomNormal();

      if(shock < -1.65) { // approx 5% tail
        portfolioLoss += EAD * LGD;
      }
    });

    losses.push(portfolioLoss);
  }

  losses.sort((a,b)=>a-b);

  const percentile99 =
    losses[Math.floor(simulations*0.99)];

  return {
    statusCode:200,
    body:JSON.stringify({
      simulations,
      percentile99Loss:percentile99
    })
  };
}
