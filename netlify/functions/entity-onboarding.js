import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { email, entity_slug } = JSON.parse(event.body);

  const customer = await stripe.customers.create({ email });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{
      price: process.env.STRIPE_PRICE_SAAS_MONTHLY
    }]
  });

  await supabase.from('entities').insert({
    entity_slug,
    stripe_customer_id: customer.id,
    subscription_id: subscription.id,
    created_at: new Date().toISOString()
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      entity_slug,
      subscription_id: subscription.id
    })
  };
}
