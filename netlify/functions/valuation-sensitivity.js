import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });
  const MRR = subs.data.reduce((sum,s)=>
    sum+(s.items.data[0]?.price.unit_amount||0),0)/100;

  const ARR = MRR*12;

  const growthRates = [0.1,0.2,0.3];
  const churnRates = [0.05,0.1,0.15];

  const matrix = [];

  for (const g of growthRates) {
    for (const c of churnRates) {

      const projectedARR = ARR * (1+g) * (1-c);
      const valuation = projectedARR * 6;

      matrix.push({
        growth:g,
        churn:c,
        valuation
      });
    }
  }

  return {
    statusCode:200,
    body:JSON.stringify(matrix)
  };
}
