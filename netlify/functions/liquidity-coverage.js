import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const totalLiquidity =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const projected30DayOutflow = totalLiquidity * 0.4;

  const LCR =
    projected30DayOutflow > 0
      ? (totalLiquidity/projected30DayOutflow)*100
      : 100;

  return {
    statusCode:200,
    body:JSON.stringify({
      highQualityLiquidAssets:totalLiquidity,
      projected30DayOutflow,
      liquidityCoverageRatio:LCR.toFixed(2),
      meetsRequirement:LCR >= 100
    })
  };
}
