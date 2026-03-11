import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const threshold = 50;

  const { data: artists } = await supabase
    .from('artist_balances')
    .select('*')
    .gt('available_balance', threshold);

  if (!artists.length) {
    return { statusCode: 200, body: JSON.stringify({ message: "No eligible payouts" }) };
  }

  const { data: batch } = await supabase
    .from('payout_batches')
    .insert({ total_amount: 0 })
    .select()
    .single();

  let total = 0;

  for (const artist of artists) {

    const transfer = await stripe.transfers.create({
      amount: Math.round(artist.available_balance * 100),
      currency: "usd",
      destination: artist.stripe_account_id
    });

    await supabase.from('payout_line_items').insert({
      batch_id: batch.id,
      artist_email: artist.email,
      amount: artist.available_balance,
      stripe_transfer_id: transfer.id,
      status: "completed"
    });

    await supabase.from('artist_balances')
      .update({ available_balance: 0 })
      .eq('email', artist.email);

    total += artist.available_balance;
  }

  await supabase.from('payout_batches')
    .update({ total_amount: total, status: "completed" })
    .eq('id', batch.id);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, batch_id: batch.id })
  };
}
