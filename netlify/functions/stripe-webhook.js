const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  let stripeEvent;

  try {
    stripeEvent = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  if (stripeEvent.type !== "checkout.session.completed") {
    return { statusCode: 200, body: "Ignored" };
  }

  const session = stripeEvent.data.object;
  const email = session.customer_details?.email;
  const lookupKey = session.metadata?.lookup_key;

  if (!email || !lookupKey) {
    return { statusCode: 400, body: "Missing email or lookup_key" };
  }

  global.TKFM_CREDITS = global.TKFM_CREDITS || {};

  if (!global.TKFM_CREDITS[email]) {
    global.TKFM_CREDITS[email] = {
      ai_drops_25: 0,
      sponsor_read_20pack: 0
    };
  }

  const CREDIT_MAP = {
    ai_drops_25: { key: "ai_drops_25", amount: 25 },
    ai_drops_100: { key: "ai_drops_25", amount: 100 },
    sponsor_read_20pack: { key: "sponsor_read_20pack", amount: 20 }
  };

  const refill = CREDIT_MAP[lookupKey];
  if (!refill) {
    return { statusCode: 200, body: "No refill mapped" };
  }

  global.TKFM_CREDITS[email][refill.key] += refill.amount;

  console.log("TKFM CREDIT REFILL", email, refill);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      email,
      credits: global.TKFM_CREDITS[email]
    })
  };
};
