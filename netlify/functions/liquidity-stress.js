import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const totalLiquidity =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const stressScenarios = [0.3,0.5,0.7];

  const results = stressScenarios.map(shock => {

    const stressedOutflow = totalLiquidity * shock;
    const remainingLiquidity = totalLiquidity - stressedOutflow;

    return {
      shockPercent:shock*100,
      stressedOutflow,
      remainingLiquidity,
      solvent: remainingLiquidity > 0
    };
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      totalLiquidity,
      results
    })
  };
}
