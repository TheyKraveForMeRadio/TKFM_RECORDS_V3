import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

  switch (stripeEvent.type) {

    /* ✅ SUBSCRIPTION CREATED / RENEWED */
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object;
      const email = session.customer_details?.email;
      const lookup = session.metadata?.lookup_key || session.display_items?.[0]?.plan?.lookup_key;

      if (!email) break;

      let label_plan = 'monthly_basic';
      let credits = {};

      if (lookup === 'artist_monthly_label_access') {
        credits = { ai_drops_25: 25, sponsor_read_5pack: 5 };
      }

      if (lookup === 'artist_monthly_premium') {
        label_plan = 'monthly_premium';
        credits = {
          ai_drops_100: 100,
          sponsor_read_20pack: 20,
          radio_boosts: 10
        };
      }

      await supabase
        .from('tkfm_artists')
        .upsert({
          email,
          label_plan,
          subscription_active: true,
          credits
        }, { onConflict: ['email'] });

      break;
    }

    /* ❌ SUBSCRIPTION CANCELED */
    case 'customer.subscription.deleted': {
      const sub = stripeEvent.data.object;
      const customer = await stripe.customers.retrieve(sub.customer);
      const email = customer.email;

      if (!email) break;

      await supabase
        .from('tkfm_artists')
        .update({
          subscription_active: false
        })
        .eq('email', email);

      break;
    }
  }

  return { statusCode: 200, body: 'ok' };
}
