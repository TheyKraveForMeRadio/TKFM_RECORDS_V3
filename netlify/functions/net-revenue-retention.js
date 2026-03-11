import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'all', limit:100 });

  let startingMRR = 0;
  let expansionMRR = 0;
  let churnMRR = 0;

  subs.data.forEach(sub => {

    const amount = (sub.items.data[0]?.price.unit_amount || 0)/100;

    if(sub.status === 'active') startingMRR += amount;

    if(sub.status === 'active' && sub.metadata?.upgraded === 'true')
      expansionMRR += amount * 0.2;

    if(sub.status === 'canceled')
      churnMRR += amount;
  });

  const NRR =
    startingMRR > 0
      ? ((startingMRR + expansionMRR - churnMRR)/startingMRR)*100
      : 100;

  return {
    statusCode:200,
    body:JSON.stringify({
      startingMRR,
      expansionMRR,
      churnMRR,
      NRR
    })
  };
}
