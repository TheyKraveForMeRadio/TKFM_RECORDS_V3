const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

exports.handler = async (event) => {
  try {
    const sig =
      event.headers["stripe-signature"] ||
      event.headers["Stripe-Signature"];

    if (!sig) {
      return {
        statusCode: 400,
        body: "Missing Stripe signature",
      };
    }

    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("✅ VERIFIED EVENT:", stripeEvent.type);

    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;

      const planId = session.metadata?.planId || "unknown";
      const customerEmail =
        session.customer_details?.email ||
        session.customer_email ||
        "unknown";

      console.log("💰 PAYMENT SUCCESS");
      console.log("PLAN:", planId);
      console.log("EMAIL:", customerEmail);
      console.log("SESSION:", session.id);

      /*
        NEXT:
        intake → submissions
        review queue
        owner delivery lane
        onboarding email
        client dashboard unlock
      */
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        received: true,
      }),
    };
  } catch (error) {
    console.error("❌ WEBHOOK ERROR:", error.message);

    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
