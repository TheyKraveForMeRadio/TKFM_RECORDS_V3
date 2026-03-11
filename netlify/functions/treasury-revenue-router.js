import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { amount, connected_account_id, platform_fee_percent } =
    JSON.parse(event.body || "{}");

  const applicationFee = Math.floor(
    amount * (platform_fee_percent / 100)
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
    application_fee_amount: applicationFee,
    transfer_data: {
      destination: connected_account_id
    }
  });

  return {
    statusCode:200,
    body:JSON.stringify(paymentIntent)
  };
}
