import { supabase } from './supabase.js';

function simulateGBM(S0, mu, sigma, T, steps) {
  const dt = T/steps;
  let S = S0;

  for(let i=0;i<steps;i++) {
    const Z = Math.random();
    S = S * Math.exp((mu - 0.5*sigma*sigma)*dt + sigma*Math.sqrt(dt)*Z);
  }

  return S;
}

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const capital =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const mu = 0.08;     // expected growth
  const sigma = 0.2;   // volatility
  const T = 1;         // 1 year
  const steps = 252;

  const projectedCapital =
    simulateGBM(capital, mu, sigma, T, steps);

  return {
    statusCode:200,
    body:JSON.stringify({
      currentCapital:capital,
      projectedCapital
    })
  };
}
