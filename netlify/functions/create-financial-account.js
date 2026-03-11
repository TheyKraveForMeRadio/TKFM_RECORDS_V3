import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { connected_account_id } = JSON.parse(event.body || '{}');

  if (!connected_account_id) {
    return { statusCode:400, body:"Connected account required" };
  }

  const financialAccount =
    await stripe.treasury.financialAccounts.create(
      {
        supported_currencies: ['usd'],
        features: {
          card_issuing: { requested: true },
          inbound_transfers: { ach: { requested: true } },
          outbound_payments: { ach: { requested: true } }
        }
      },
      {
        stripeAccount: connected_account_id
      }
    );

  return {
    statusCode:200,
    body:JSON.stringify(financialAccount)
  };
}
