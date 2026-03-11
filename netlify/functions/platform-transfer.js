import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { connected_account_id, amount } =
    JSON.parse(event.body || '{}');

  const transfer = await stripe.transfers.create({
    amount: amount * 100,
    currency: 'usd',
    destination: connected_account_id
  });

  return {
    statusCode:200,
    body:JSON.stringify(transfer)
  };
}
