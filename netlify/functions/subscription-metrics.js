import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const activeSubs = await stripe.subscriptions.list({
    status: 'active',
    limit: 100
  });

  const canceledSubs = await stripe.subscriptions.list({
    status: 'canceled',
    limit: 100
  });

  const active = activeSubs.data.length;
  const canceled = canceledSubs.data.length;

  const churnRate =
    active > 0 ? (canceled / (active + canceled)) * 100 : 0;

  return {
    statusCode: 200,
    body: JSON.stringify({
      activeSubscriptions: active,
      canceledSubscriptions: canceled,
      churnRate: churnRate.toFixed(2)
    })
  };
}
