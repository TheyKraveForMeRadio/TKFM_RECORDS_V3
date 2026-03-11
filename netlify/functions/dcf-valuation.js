import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const MRR = subs.data.reduce((sum,s)=>
    sum+(s.items.data[0]?.price.unit_amount||0),0)/100;

  const ARR = MRR*12;

  const growthRate = 0.20;
  const discountRate = 0.12;
  const terminalMultiple = 6;

  let cashFlows = [];
  let currentARR = ARR;

  for (let year=1; year<=5; year++) {
    currentARR *= (1+growthRate);
    cashFlows.push(currentARR);
  }

  const discountedValue = cashFlows.reduce((sum,cf,i)=>{
    return sum + (cf / Math.pow(1+discountRate, i+1));
  },0);

  const terminalValue =
    (cashFlows[4] * terminalMultiple) /
    Math.pow(1+discountRate,5);

  const enterpriseValue = discountedValue + terminalValue;

  return {
    statusCode:200,
    body:JSON.stringify({
      ARR,
      growthRate,
      discountRate,
      enterpriseValue
    })
  };
}
