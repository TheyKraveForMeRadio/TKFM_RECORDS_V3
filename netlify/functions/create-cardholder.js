import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { connected_account_id, name, email } =
    JSON.parse(event.body || '{}');

  const cardholder = await stripe.issuing.cardholders.create(
    {
      type: 'individual',
      name,
      email
    },
    { stripeAccount: connected_account_id }
  );

  return {
    statusCode:200,
    body:JSON.stringify(cardholder)
  };
}
