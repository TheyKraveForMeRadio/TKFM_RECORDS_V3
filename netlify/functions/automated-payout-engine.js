import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const { data: artists } = await supabase
    .from('artist_balances')
    .select('*');

  const results = [];

  for(const artist of artists||[]) {

    if(!artist.stripe_account_id) continue;

    const account = await stripe.accounts.retrieve(artist.stripe_account_id);

    if(!account.payouts_enabled) continue;

    if(Number(artist.available_balance) < 100) continue;

    const transfer = await stripe.transfers.create({
      amount: Math.floor(Number(artist.available_balance)*100),
      currency:"usd",
      destination: artist.stripe_account_id
    });

    await supabase
      .from('artist_balances')
      .update({ available_balance:0 })
      .eq('id',artist.id);

    results.push({
      artist:artist.email,
      transferId:transfer.id
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify(results)
  };
}
