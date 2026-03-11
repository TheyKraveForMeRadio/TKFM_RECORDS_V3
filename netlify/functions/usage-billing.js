import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const { data: usage } = await supabase
    .from('usage_metrics')
    .select('*');

  for(const record of usage||[]) {

    if(record.billable_units > 0) {

      await stripe.invoiceItems.create({
        customer: record.stripe_customer_id,
        amount: record.billable_units * 100, // $1 per unit
        currency:'usd',
        description:'Usage-based billing'
      });
    }
  }

  return {
    statusCode:200,
    body:"usage_billed"
  };
}
