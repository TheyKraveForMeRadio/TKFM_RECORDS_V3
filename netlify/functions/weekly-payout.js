import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const MIN_PAYOUT = 50;

export async function handler() {

  const { data: entities } = await supabase
    .from('entities')
    .select('*');

  for (let entity of entities) {

    const { data: risk } = await supabase
      .from('entity_risk_scores')
      .select('*')
      .eq('entity_id', entity.id)
      .maybeSingle();

    if (risk?.freeze_active) {
      continue; // 🚨 AUTO FREEZE BLOCK
    }

    const { data: balances } = await supabase
      .from('artist_balances')
      .select('*')
      .eq('entity_id', entity.id);

    for (let artist of balances) {

      if (artist.available_balance < MIN_PAYOUT) continue;
      if (!artist.stripe_account_id) continue;

      const account = await stripe.accounts.retrieve(artist.stripe_account_id);

      if (!account.details_submitted || account.payouts_enabled !== true) {
        continue;
      }

      const escrow = artist.available_balance * 0.25;
      const payoutAmount = artist.available_balance - escrow;

      await stripe.transfers.create({
        amount: Math.round(payoutAmount * 100),
        currency:'usd',
        destination:artist.stripe_account_id
      });

      await supabase.from('tax_escrow').insert({
        artist_email:artist.email,
        reserved_amount:escrow,
        year:new Date().getFullYear(),
        quarter:Math.ceil((new Date().getMonth()+1)/3)
      });

      await supabase.from('artist_balances')
        .update({ available_balance:0 })
        .eq('id',artist.id);

    }
  }

  return { statusCode:200, body:"weekly payout completed" };
}
