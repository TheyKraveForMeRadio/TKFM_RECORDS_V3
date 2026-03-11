import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const MRR = subs.data.reduce((s,sub)=>
    s+(sub.items.data[0]?.price.unit_amount||0),0)/100;

  const customers = subs.data.length || 1;

  const ARPU = MRR/customers;

  const churnRate = 0.04; // example 4%

  const LTV = ARPU / churnRate;

  return {
    statusCode:200,
    body:JSON.stringify({
      MRR,
      ARPU,
      churnRate,
      LTV
    })
  };
}
