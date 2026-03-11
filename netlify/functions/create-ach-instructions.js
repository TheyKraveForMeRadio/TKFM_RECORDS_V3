import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { connected_account_id, financial_account_id } =
    JSON.parse(event.body || "{}");

  const instructions =
    await stripe.treasury.financialAccounts.createInboundTransfer(
      financial_account_id,
      {
        amount: 0,
        currency: "usd",
        origin_payment_method_types: ["us_bank_account"]
      },
      { stripeAccount: connected_account_id }
    );

  return {
    statusCode:200,
    body:JSON.stringify(instructions)
  };
}
