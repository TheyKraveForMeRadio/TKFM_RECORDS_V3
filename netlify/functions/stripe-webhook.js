const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: err.message };
  }

  if (stripeEvent.type === 'checkout.session.completed') {

    const session = stripeEvent.data.object;

    // 🔥 GET USER ID FROM SUCCESS URL
    const user_id = new URL(session.success_url).searchParams.get("user_id");

    // 💰 AMOUNT IN DOLLARS
    const amount = session.amount_total / 100;

    // 🔥 CALL SUPABASE FUNCTION add_balance()
    await fetch(process.env.SUPABASE_URL + "/rest/v1/rpc/add_balance", {
      method: "POST",
      headers: {
        "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        u: user_id,
        amount: amount
      })
    });
  }

  return { statusCode: 200, body: "ok" };
};
