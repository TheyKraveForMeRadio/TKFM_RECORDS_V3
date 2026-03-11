import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  let MRR = 0;

  subs.data.forEach(s=>{
    const price = s.items.data[0]?.price;
    if(!price) return;

    let amount = price.unit_amount / 100;

    if(price.recurring.interval === 'year')
      amount = amount / 12;

    MRR += amount;
  });

  const ARR = MRR * 12;

  return {
    statusCode:200,
    body:JSON.stringify({ MRR, ARR })
  };
}
