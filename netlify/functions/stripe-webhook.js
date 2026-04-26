const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  console.log("🔥 WEBHOOK HIT");

  const sig = event.headers["stripe-signature"];

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body, // MUST be raw
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ SIGNATURE FAILED:", err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  console.log("✅ VERIFIED EVENT:", stripeEvent.type);

  // 🎯 MAIN SWITCH
  switch (stripeEvent.type) {

    case "checkout.session.completed": {
      const session = stripeEvent.data.object;

      console.log("💰 PAYMENT SUCCESS");

      // 👇 THIS IS YOUR CONTROL CENTER
      const planId = session.metadata?.lookup_key || "NO_PLAN_ID";

      console.log("📦 PLAN ID:", planId);

      // 🚧 TEST ROUTING (WE EXPAND THIS NEXT)
      if (planId === "test_product") {
        console.log("✅ TEST PRODUCT PURCHASED");
      }

      break;
    }

    default:
      console.log("Unhandled event:", stripeEvent.type);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
