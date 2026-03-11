import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { connected_account_id } =
    event.queryStringParameters || {};

  if (!connected_account_id) {
    return { statusCode:400, body:"Account required" };
  }

  const balance =
    await stripe.balance.retrieve(
      { },
      { stripeAccount: connected_account_id }
    );

  const charges =
    await stripe.charges.list(
      { limit: 20 },
      { stripeAccount: connected_account_id }
    );

  const cards =
    await stripe.issuing.cards.list(
      { limit: 20 },
      { stripeAccount: connected_account_id }
    );

  return {
    statusCode:200,
    body:JSON.stringify({
      balance,
      recent_charges: charges.data,
      issued_cards: cards.data
    })
  };
}
