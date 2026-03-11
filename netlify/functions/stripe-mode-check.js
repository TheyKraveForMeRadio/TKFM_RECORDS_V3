import Stripe from 'stripe';

export async function handler() {

  const key = process.env.STRIPE_SECRET_KEY;

  const mode = key.startsWith('sk_live')
    ? 'LIVE'
    : 'TEST';

  return {
    statusCode:200,
    body:JSON.stringify({
      stripeMode:mode
    })
  };
}
