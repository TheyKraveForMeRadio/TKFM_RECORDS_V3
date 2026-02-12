import { supabase } from './supabase.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Handle subscription updates
  if (stripeEvent.type === 'customer.subscription.updated' || stripeEvent.type === 'customer.subscription.created') {
    const sub = stripeEvent.data.object;
    const email = sub.metadata?.email;
    if (email) {
      await supabase.from('subscriptions')
        .upsert({ email, status: sub.status }, { onConflict: ['email'] });
    }
  }

  // Handle payment success for top-ups or one-offs
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const email = session.customer_email;
    const credits = parseInt(session.metadata?.credits || 0, 10);
    const credit_key = session.metadata?.credit_key;

    if (email && credits && credit_key) {
      const { data } = await supabase
        .from('credits')
        .select('*')
        .eq('email', email)
        .eq('credit_key', credit_key)
        .single();

      if (data) {
        await supabase.from('credits')
          .update({ balance: data.balance + credits })
          .eq('id', data.id);
      } else {
        await supabase.from('credits').insert({
          email, credit_key, balance: credits
        });
      }

      await supabase.from('credit_logs').insert({
        email, credit_key, action: 'stripe_checkout', amount: credits
      });
    }
  }

  return { statusCode: 200, body: 'Webhook received' };
}
