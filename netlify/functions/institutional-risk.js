import { supabase } from './supabase.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const totalLiquidity =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const ARR =
    subs.data.reduce((s,sub)=>
      s+(sub.items.data[0]?.price.unit_amount||0),0)/100*12;

  const liquidityRatio =
    ARR > 0 ? totalLiquidity/ARR : 0;

  let riskScore = 0;

  if (liquidityRatio < 0.5) riskScore += 40;
  if (subs.data.length < 10) riskScore += 20;
  if (ARR < 100000) riskScore += 20;

  const riskLevel =
    riskScore >= 60 ? "High Risk"
    : riskScore >= 30 ? "Moderate Risk"
    : "Low Risk";

  return {
    statusCode:200,
    body:JSON.stringify({
      ARR,
      totalLiquidity,
      liquidityRatio,
      riskScore,
      riskLevel
    })
  };
}
