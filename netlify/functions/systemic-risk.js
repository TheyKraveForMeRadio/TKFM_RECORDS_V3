import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const ARR =
    subs.data.reduce((s,sub)=>
      s+(sub.items.data[0]?.price.unit_amount||0),0)/100*12;

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const liquidity =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const exposureRatio =
    ARR > 0 ? liquidity/ARR : 0;

  let systemicRisk = "LOW";

  if (exposureRatio < 0.5) systemicRisk = "HIGH";
  else if (exposureRatio < 1) systemicRisk = "MEDIUM";

  return {
    statusCode:200,
    body:JSON.stringify({
      ARR,
      liquidity,
      exposureRatio,
      systemicRisk
    })
  };
}
