import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { entity_id, email } =
    JSON.parse(event.body || '{}');

  const customer = await stripe.customers.create({ email });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.STRIPE_PRICE_SAAS_MONTHLY }]
  });

  await supabase
    .from('treasury_entities')
    .update({
      stripe_customer_id: customer.id,
      stripe_subscription_id: subscription.id
    })
    .eq('id', entity_id);

  return {
    statusCode:200,
    body:JSON.stringify({ subscription_id: subscription.id })
  };
}
