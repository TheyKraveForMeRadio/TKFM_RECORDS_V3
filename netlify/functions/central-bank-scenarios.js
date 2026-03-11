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

  const scenarios = [
    {
      event:"Rate Hike +2%",
      impactARR:ARR*0.9,
      impactLiquidity:liquidity*0.95
    },
    {
      event:"Rate Cut -2%",
      impactARR:ARR*1.1,
      impactLiquidity:liquidity*1.05
    },
    {
      event:"Capital Freeze",
      impactARR:ARR*0.8,
      impactLiquidity:liquidity*0.7
    }
  ];

  return {
    statusCode:200,
    body:JSON.stringify({
      baselineARR:ARR,
      baselineLiquidity:liquidity,
      scenarios
    })
  };
}
