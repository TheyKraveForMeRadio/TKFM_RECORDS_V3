import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const MRR = subs.data.reduce((sum,s)=>
    sum+(s.items.data[0]?.price.unit_amount||0),0)/100;

  const ARR = MRR*12;

  const raiseTarget = ARR*2;

  const plan = {
    raiseTarget,
    useOfFunds:[
      "Scale engineering",
      "Expand treasury services",
      "Capital advance product",
      "International expansion",
      "Compliance + regulatory stack"
    ],
    investorTargets:[
      "Fintech VCs",
      "Growth equity funds",
      "Strategic media investors"
    ]
  };

  return {
    statusCode:200,
    body:JSON.stringify(plan)
  };
}
