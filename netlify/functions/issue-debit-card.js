import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { connected_account_id, cardholder_id } =
    JSON.parse(event.body || '{}');

  const card = await stripe.issuing.cards.create(
    {
      cardholder: cardholder_id,
      currency: 'usd',
      type: 'virtual'
    },
    { stripeAccount: connected_account_id }
  );

  return {
    statusCode:200,
    body:JSON.stringify(card)
  };
}
