import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'all', limit:100 });

  let stable = 0;
  let atRisk = 0;

  subs.data.forEach(s=>{
    const amount = (s.items.data[0]?.price.unit_amount || 0)/100;

    if(s.status === 'active') stable += amount;
    if(s.cancel_at_period_end) atRisk += amount;
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      stableMRR:stable,
      atRiskMRR:atRisk
    })
  };
}
