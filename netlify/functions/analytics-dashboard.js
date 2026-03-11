import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const MRR = subs.data.reduce((s,sub)=>
    s + (sub.items.data[0]?.price.unit_amount || 0),0) / 100;

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const totalArtistBalances =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  return {
    statusCode:200,
    body:JSON.stringify({
      MRR,
      ARR:MRR*12,
      totalArtistBalances,
      timestamp:new Date().toISOString()
    })
  };
}
