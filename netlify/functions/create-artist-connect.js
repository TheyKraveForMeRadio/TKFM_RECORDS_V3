const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body || "{}");
    if (!email) return { statusCode: 400, body: "Email required" };

    const account = await stripe.accounts.create({
      type: "express",
      email,
      capabilities: {
        transfers: { requested: true }
      }
    });

    const link = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.URL}/payouts/refresh.html`,
      return_url: `${process.env.URL}/payouts/success.html`,
      type: "account_onboarding"
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        accountId: account.id,
        url: link.url
      })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Stripe error" };
  }
};
