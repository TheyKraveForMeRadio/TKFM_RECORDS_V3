import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const initial =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const T = 1.0;
  const N = 100;
  const dt = T/N;
  const sigma = 0.2;
  const mu = 0.05;

  let V = initial;

  for(let i=0;i<N;i++) {
    const diffusion = sigma * Math.sqrt(dt) * (Math.random()-0.5);
    const drift = mu * dt;
    V = V + drift*V + diffusion*V;
  }

  return {
    statusCode:200,
    body:JSON.stringify({
      initialBalanceSheet:initial,
      projectedContinuousTime:V
    })
  };
}
