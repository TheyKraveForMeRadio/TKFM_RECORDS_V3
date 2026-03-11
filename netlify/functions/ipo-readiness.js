import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const MRR = subs.data.reduce((sum,s)=>
    sum+(s.items.data[0]?.price.unit_amount||0),0)/100;

  const ARR = MRR*12;

  let score = 0;

  if (ARR > 10000000) score += 30;
  if (ARR > 5000000) score += 20;
  if (subs.data.length > 1000) score += 20;
  if (ARR > 1000000) score += 10;

  const readiness =
    score >= 60 ? "IPO Candidate"
    : score >= 40 ? "Late Stage Private"
    : "Growth Stage";

  return {
    statusCode:200,
    body:JSON.stringify({
      ARR,
      subscriberCount:subs.data.length,
      score,
      readiness
    })
  };
}
