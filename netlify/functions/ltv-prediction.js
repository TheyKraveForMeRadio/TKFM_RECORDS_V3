import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  let MRR = 0;

  subs.data.forEach(s=>{
    MRR += (s.items.data[0]?.price.unit_amount || 0)/100;
  });

  const churnRate = 0.05;
  const LTV = churnRate > 0 ? (MRR / churnRate) : 0;

  return {
    statusCode:200,
    body:JSON.stringify({
      MRR,
      churnRate,
      predictedLTV: LTV
    })
  };
}
