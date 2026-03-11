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
    return { statusCode:400, body:err.message };
  }

  if (stripeEvent.type === 'treasury.financial_account.created') {
    console.log("Financial account created");
  }

  if (stripeEvent.type === 'issuing.card.created') {
    console.log("Card issued");
  }

  return { statusCode:200, body:"ok" };
}
