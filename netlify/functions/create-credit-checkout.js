const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { email, lookup_key } = JSON.parse(event.body || "{}");
    if (!email || !lookup_key) {
      return { statusCode: 400, body: "Missing email or lookup_key" };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [{ lookup_key, quantity: 1 }],
      success_url: `${process.env.URL}/label-home.html?credits=success`,
      cancel_url: `${process.env.URL}/label-home.html?credits=cancel`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Stripe error" };
  }
};
