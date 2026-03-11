import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const { data: jobs } = await supabase
    .from('payout_queue')
    .select('*')
    .eq('status','queued')
    .limit(25);

  for(const job of jobs || []) {

    const { data: artist } = await supabase
      .from('artist_balances')
      .select('*')
      .eq('id', job.artist_id)
      .single();

    if(!artist?.stripe_account_id) continue;

    await stripe.transfers.create({
      amount: Math.floor(job.amount*100),
      currency:'usd',
      destination: artist.stripe_account_id
    });

    await supabase
      .from('payout_queue')
      .update({ status:'completed' })
      .eq('id', job.id);
  }

  return { statusCode:200, body:"processed" };
}
