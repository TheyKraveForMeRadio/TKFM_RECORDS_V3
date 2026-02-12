const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { lookup_key, email } = JSON.parse(event.body || "{}");

  if (!lookup_key || !email) {
    return { statusCode: 400, body: "lookup_key and email required" };
  }

  const prices = await stripe.prices.list({
    lookup_keys: [lookup_key],
    expand: ["data.product"]
  });

  if (!prices.data.length) {
    return { statusCode: 404, body: "Price not found" };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: prices.data[0].id, quantity: 1 }],
    customer_email: email,
    metadata: { lookup_key },
    success_url: `${process.env.URL}/success.html`,
    cancel_url: `${process.env.URL}/cancel.html`
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url })
  };
};
