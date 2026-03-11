import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const baseLiquidity =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const scenarios = [
    { name:"GDP -2%", liquidityShock:0.15 },
    { name:"Credit Freeze", liquidityShock:0.35 },
    { name:"Systemic Event", liquidityShock:0.55 }
  ];

  const results = scenarios.map(s => {
    const postShock = baseLiquidity*(1-s.liquidityShock);
    return {
      scenario:s.name,
      liquidityAfterShock:postShock,
      survives:postShock>0
    };
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      baselineLiquidity:baseLiquidity,
      scenarios:results
    })
  };
}
