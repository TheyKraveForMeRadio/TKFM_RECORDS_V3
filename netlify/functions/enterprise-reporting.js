import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const MRR = subs.data.reduce((s,sub)=>
    s+(sub.items.data[0]?.price.unit_amount||0),0)/100;

  return {
    statusCode:200,
    body:JSON.stringify({
      MRR,
      ARR:MRR*12,
      generated:new Date().toISOString()
    })
  };
}
