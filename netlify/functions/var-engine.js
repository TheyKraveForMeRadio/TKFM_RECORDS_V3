import { supabase } from './supabase.js';

function randomShock(min,max){
  return Math.random()*(max-min)+min;
}

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const portfolio =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const simulations = [];
  const runs = 500;

  for (let i=0;i<runs;i++){
    const shock = randomShock(-0.4,-0.05);
    const loss = portfolio * Math.abs(shock);
    simulations.push(loss);
  }

  simulations.sort((a,b)=>a-b);

  const var95 =
    simulations[Math.floor(0.95*runs)];

  return {
    statusCode:200,
    body:JSON.stringify({
      portfolio,
      VaR_95:var95,
      simulationRuns:runs
    })
  };
}
