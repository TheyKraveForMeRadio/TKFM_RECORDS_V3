import Stripe from 'stripe';
import { supabase } from './supabase.js';

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
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    };
  }

  const type = stripeEvent.type;
  const obj = stripeEvent.data.object;

  let email =
    obj.customer_email ||
    obj.metadata?.email ||
    stripeEvent.data.object?.customer_details?.email;

  if (!email) {
    return { statusCode: 200, body: 'No email attached to subscription' };
  }

  try {
    // 🔥 ACTIVATE SUBSCRIPTION
    if (
      type === 'customer.subscription.created' ||
      type === 'customer.subscription.updated'
    ) {
      await supabase
        .from('tkfm_artists')
        .upsert(
          { email, subscription_active: true },
          { onConflict: 'email' }
        );

      await supabase
        .from('webhook_logs')
        .insert({ event_type: type, email });

      return { statusCode: 200, body: 'Subscription activated' };
    }

    // 🔥 DEACTIVATE SUBSCRIPTION
    if (
      type === 'customer.subscription.deleted' ||
      obj.status === 'canceled'
    ) {
      await supabase
        .from('tkfm_artists')
        .upsert(
          { email, subscription_active: false },
          { onConflict: 'email' }
        );

      await supabase
        .from('webhook_logs')
        .insert({ event_type: type, email });

      return { statusCode: 200, body: 'Subscription deactivated' };
    }

    // 🔥 LOG OTHER EVENTS (optional visibility)
    await supabase
      .from('webhook_logs')
      .insert({ event_type: type, email });

    return { statusCode: 200, body: 'Event received' };

  } catch (err) {
    return {
      statusCode: 500,
      body: `Database error: ${err.message}`
    };
  }
}
