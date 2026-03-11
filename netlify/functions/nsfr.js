import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const { data: payouts } = await supabase
    .from('payout_line_items')
    .select('amount');

  const availableStableFunding =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0)*0.8;

  const requiredStableFunding =
    (payouts||[]).reduce((s,p)=>s+Number(p.amount||0),0);

  const NSFR =
    requiredStableFunding > 0
      ? (availableStableFunding/requiredStableFunding)*100
      : 100;

  return {
    statusCode:200,
    body:JSON.stringify({
      availableStableFunding,
      requiredStableFunding,
      netStableFundingRatio:NSFR.toFixed(2),
      compliant:NSFR >= 100
    })
  };
}
