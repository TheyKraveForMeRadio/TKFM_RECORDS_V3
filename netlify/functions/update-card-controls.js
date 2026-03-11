import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { connected_account_id, card_id, spending_limit } =
    JSON.parse(event.body || "{}");

  if (!connected_account_id || !card_id) {
    return { statusCode:400, body:"Missing parameters" };
  }

  const updated = await stripe.issuing.cards.update(
    card_id,
    {
      spending_controls: {
        spending_limits: [
          {
            amount: spending_limit * 100,
            interval: "monthly"
          }
        ],
        blocked_categories: ["gambling","adult_entertainment"]
      }
    },
    { stripeAccount: connected_account_id }
  );

  return {
    statusCode:200,
    body:JSON.stringify(updated)
  };
}
