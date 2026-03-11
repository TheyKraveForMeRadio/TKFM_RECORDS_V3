import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const MRR = subs.data.reduce((sum,s)=>
    sum+(s.items.data[0]?.price.unit_amount||0),0)/100;

  const growthRate = 0.20; // 20% annual
  const churn = 0.08;
  const margin = 0.70;

  const projections = [];

  let currentARR = MRR*12;

  for (let year=1; year<=3; year++) {

    currentARR = currentARR * (1+growthRate) * (1-churn);

    const adjusted = currentARR * margin;
    const valuation = adjusted * 6;

    projections.push({
      year,
      projectedARR:currentARR,
      projectedValuation:valuation
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify({
      baseARR:MRR*12,
      growthRate,
      churn,
      margin,
      projections
    })
  };
}
