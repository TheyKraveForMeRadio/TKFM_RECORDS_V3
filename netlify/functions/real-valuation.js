import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });
  const canceled = await stripe.subscriptions.list({ status:'canceled', limit:100 });

  const MRR = subs.data.reduce((sum,s)=>
    sum+(s.items.data[0]?.price.unit_amount||0),0)/100;

  const ARR = MRR*12;

  const churn =
    subs.data.length > 0
      ? (canceled.data.length/(subs.data.length+canceled.data.length))
      : 0.05;

  const ARPU =
    subs.data.length > 0
      ? MRR/subs.data.length
      : 0;

  const LTV =
    churn > 0
      ? ARPU / churn
      : ARPU * 24;

  const margin = 0.65; // adjustable gross margin
  const adjustedARR = ARR * margin;

  const enterpriseValue =
    adjustedARR * (1/(churn || 0.05));

  return {
    statusCode:200,
    body:JSON.stringify({
      ARR,
      churn,
      ARPU,
      LTV,
      adjustedARR,
      enterpriseValue
    })
  };
}
