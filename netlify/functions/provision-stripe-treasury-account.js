import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { entity_id, business_name, email } =
    JSON.parse(event.body || '{}');

  const account = await stripe.accounts.create({
    type: 'custom',
    country: 'US',
    email,
    business_type: 'company',
    company: {
      name: business_name
    },
    capabilities: {
      transfers: { requested: true },
      treasury: { requested: true }
    }
  });

  await supabase
    .from('treasury_entities')
    .update({
      stripe_account_id: account.id,
      bank_provider: 'stripe'
    })
    .eq('id', entity_id);

  return {
    statusCode:200,
    body:JSON.stringify({ account_id: account.id })
  };
}
