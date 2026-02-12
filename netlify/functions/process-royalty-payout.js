const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { accountId, amountCents } = JSON.parse(event.body || "{}");
    if (!accountId || !amountCents)
      return { statusCode: 400, body: "Missing payout data" };

    const transfer = await stripe.transfers.create({
      amount: amountCents,
      currency: "usd",
      destination: accountId,
      description: "TKFM Records Artist Royalty Payout"
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, transfer })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Payout failed" };
  }
};
