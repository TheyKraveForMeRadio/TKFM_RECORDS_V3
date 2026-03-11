import { supabase } from './supabase.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });
  const MRR = subs.data.reduce((sum,s)=>
    sum+(s.items.data[0]?.price.unit_amount||0),0)/100;

  const ARR = MRR*12;

  const { data: payouts } = await supabase
    .from('payout_line_items')
    .select('amount');

  const totalPayouts =
    (payouts||[]).reduce((sum,p)=>sum+Number(p.amount||0),0);

  const grossMargin =
    ARR > 0 ? ((ARR-totalPayouts)/ARR)*100 : 0;

  return {
    statusCode:200,
    body:JSON.stringify({
      ARR,
      MRR,
      totalPayouts,
      grossMargin: grossMargin.toFixed(2),
      reportingTimestamp:new Date().toISOString()
    })
  };
}
