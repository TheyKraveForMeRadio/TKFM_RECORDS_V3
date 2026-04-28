const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

exports.handler = async (event) => {
  try {
    console.log("🔥 CREATE CHECKOUT SESSION HIT");

    const body = JSON.parse(event.body || "{}");
    const planId = body.planId || body.lookup_key;

    console.log("PLAN ID RECEIVED:", planId);

    const PRICE_MAP = {
      distribution_single_release: "price_1St9IULsS3JnVEiGMhDcPlzp",
      distribution_artist_monthly: "price_1St9KtLsS3JnVEiG7ufoS6F4",
      distribution_label_monthly: "price_1St9NZLsS3JnVEiGNwt9S2Pv",
    };

    const stripePriceId = PRICE_MAP[planId];

    if (!stripePriceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: `Invalid planId: ${planId}`,
        }),
      };
    }

    const isSubscription =
      planId === "distribution_artist_monthly" ||
      planId === "distribution_label_monthly";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: isSubscription ? "subscription" : "payment",
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      success_url:
        "https://www.tkfmrecords.com/distribution-success.html?session_id={CHECKOUT_SESSION_ID}",
      cancel_url:
        "https://www.tkfmrecords.com/tkfm-distribution.html?canceled=true",
      metadata: {
        planId,
        source: "tkfm_distribution",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: session.url,
        id: session.id,
      }),
    };
  } catch (error) {
    console.error("CHECKOUT ERROR:", error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
