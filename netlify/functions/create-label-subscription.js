const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body || "{}");
    if (!email) return { statusCode: 400, body: "Email required" };

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        { price: process.env.STRIPE_PRICE_ARTIST_LABEL_MONTHLY, quantity: 1 }
      ],
      success_url: `${process.env.URL}/artist-dashboard.html?success=true&email=${encodeURIComponent(email)}`,
      cancel_url: `${process.env.URL}/artist-dashboard.html?canceled=true`,
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
