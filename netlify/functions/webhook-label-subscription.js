const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  switch (stripeEvent.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      // Update DB or localStorage if needed
      console.log("Subscription created/updated:", stripeEvent.data.object);
      break;
    case "customer.subscription.deleted":
      console.log("Subscription deleted:", stripeEvent.data.object);
      break;
  }

  return { statusCode: 200, body: "OK" };
};
