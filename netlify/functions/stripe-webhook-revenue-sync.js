import Stripe from 'stripe';
import { supabase } from './supabase.js';
import { rateLimit } from './_middleware-rate-limit.js';
import { logRequest } from './_middleware-logger.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

export const config = {
  api: {
    bodyParser: false
  }
};

export async function handler(event) {

  const ip = event.headers['x-forwarded-for'] || 'unknown';

  try {

    // 🔐 RATE LIMIT
    if(!rateLimit(ip, 200, 60000)) {
      await logRequest(event, 429);
      return { statusCode:429, body:"Rate limit exceeded" };
    }

    const sig = event.headers['stripe-signature'];

    if (!sig) {
      await logRequest(event, 400);
      return { statusCode: 400, body: "Missing Stripe signature" };
    }

    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // 🔁 IDEMPOTENCY CHECK
    const { data: existingEvent } = await supabase
      .from('stripe_webhook_events')
      .select('id')
      .eq('stripe_event_id', stripeEvent.id)
      .maybeSingle();

    if (existingEvent) {
      await logRequest(event, 200);
      return { statusCode: 200, body: "Already processed" };
    }

    // 📝 LOG EVENT RECEIPT
    await supabase.from('stripe_webhook_events').insert({
      stripe_event_id: stripeEvent.id,
      event_type: stripeEvent.type,
      received_at: new Date().toISOString()
    });

    // 💰 HANDLE INVOICE PAID
    if (stripeEvent.type === 'invoice.paid') {

      const invoice = stripeEvent.data.object;
      const stripeCustomerId = invoice.customer;

      if (!stripeCustomerId) {
        await logRequest(event, 400);
        return { statusCode: 400, body: "Missing Stripe customer ID" };
      }

      const { data: entity, error } = await supabase
        .from('entities')
        .select('id')
        .eq('stripe_customer_id', stripeCustomerId)
        .single();

      if (error || !entity) {
        console.error("Entity lookup failed:", stripeCustomerId);
        await logRequest(event, 404);
        return { statusCode: 404, body: "Entity not found" };
      }

      const amountPaid = (invoice.amount_paid || 0) / 100;

      const { error: insertError } = await supabase
        .from('revenue_events')
        .insert({
          entity_id: entity.id,
          amount: amountPaid,
          source: 'stripe',
          created_at: new Date().toISOString()
        });

      if (insertError) {
        console.error("Revenue insert error:", insertError);
        await logRequest(event, 500);
        return { statusCode: 500, body: "Revenue insert failed" };
      }
    }

    await logRequest(event, 200);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {

    console.error("Stripe webhook error:", err.message);

    await logRequest(event, 400);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    };
  }
}
