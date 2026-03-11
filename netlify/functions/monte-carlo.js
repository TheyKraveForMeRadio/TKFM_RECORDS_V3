import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function randomBetween(min,max){
  return Math.random()*(max-min)+min;
}

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const MRR = subs.data.reduce((sum,s)=>
    sum+(s.items.data[0]?.price.unit_amount||0),0)/100;

  const ARR = MRR*12;

  const simulations = [];

  for (let i=0;i<100;i++){

    const growth = randomBetween(0.1,0.3);
    const churn = randomBetween(0.05,0.15);
    const margin = randomBetween(0.6,0.8);

    const projectedARR = ARR*(1+growth)*(1-churn);
    const valuation = projectedARR*margin*6;

    simulations.push(valuation);
  }

  const avgValuation =
    simulations.reduce((sum,v)=>sum+v,0)/simulations.length;

  return {
    statusCode:200,
    body:JSON.stringify({
      baseARR:ARR,
      avgValuation,
      simulations
    })
  };
}
