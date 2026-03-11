import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { name, slug, email } =
    JSON.parse(event.body || '{}');

  // 1️⃣ Create Entity
  const { data: entity } = await supabase
    .from('treasury_entities')
    .insert({
      name,
      slug,
      bank_provider:'stripe'
    })
    .select()
    .single();

  // 2️⃣ Create Stripe Customer
  const customer = await stripe.customers.create({ email });

  // 3️⃣ Subscribe using lookup key
  const prices = await stripe.prices.list({
    lookup_keys: [process.env.STRIPE_PRICE_SAAS_MONTHLY]
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: prices.data[0].id }]
  });

  // 4️⃣ Save Billing Data
  await supabase
    .from('treasury_entities')
    .update({
      stripe_customer_id: customer.id,
      stripe_subscription_id: subscription.id
    })
    .eq('id', entity.id);

  return {
    statusCode:200,
    body:JSON.stringify({ success:true, entity })
  };
}
