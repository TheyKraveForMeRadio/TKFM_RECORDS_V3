const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
  "ai_drops_10": { type: "ai", amount: 10 },
  "ai_drops_25": { type: "ai", amount: 25 },
  "ai_drops_100": { type: "ai", amount: 100 },
  "sponsor_read_5pack": { type: "sponsor", amount: 5 },
  "sponsor_read_20pack": { type: "sponsor", amount: 20 }
};

let aiCredits = {};
let sponsorCredits = {};

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook error", err.message);
    return { statusCode: 400, body: err.message };
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;
    const email = session.customer_email;

    for (const item of session.display_items || []) {
      const key = item.custom?.lookup_key || item.price?.lookup_key;
      const credit = CREDIT_MAP[key];
      if (!credit) continue;

      if (credit.type === "ai") {
        aiCredits[email] = (aiCredits[email] || 0) + credit.amount;
      }

      if (credit.type === "sponsor") {
        sponsorCredits[email] = (sponsorCredits[email] || 0) + credit.amount;
      }
    }
  }

  return { statusCode: 200, body: "ok" };
};
