import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const capital =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const scenarios = [
    { name:"Mild Recession", shock:0.2 },
    { name:"Severe Recession", shock:0.4 },
    { name:"Liquidity Crisis", shock:0.6 }
  ];

  const results = scenarios.map(s => {

    const postShockCapital =
      capital*(1-s.shock);

    return {
      scenario:s.name,
      capitalAfterShock:postShockCapital,
      solvent:postShockCapital > 0
    };
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      initialCapital:capital,
      results
    })
  };
}
