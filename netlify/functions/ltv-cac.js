import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({
    status:'active',
    limit:100
  });

  const MRR = subs.data.reduce((sum, s) =>
    sum + (s.items.data[0]?.price.unit_amount || 0), 0) / 100;

  const activeCount = subs.data.length;
  const ARPU = activeCount > 0 ? MRR / activeCount : 0;

  const churnRate = 0.05; // temporary default 5%

  const LTV = churnRate > 0 ? ARPU / churnRate : 0;

  const CAC = 250; // manual placeholder until expense ledger exists

  return {
    statusCode:200,
    body:JSON.stringify({
      ARPU,
      churnRate,
      LTV,
      CAC,
      LTV_to_CAC: CAC > 0 ? (LTV / CAC).toFixed(2) : null
    })
  };
}
