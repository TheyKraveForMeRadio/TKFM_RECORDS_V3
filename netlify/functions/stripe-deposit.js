const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {

    const { user, amount } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: "TKFM Wallet Deposit" },
          unit_amount: amount * 100
        },
        quantity: 1
      }],
      success_url: "https://www.tkfmrecords.com/success.html",
      cancel_url: "https://www.tkfmrecords.com/cancel.html",
      metadata: {
        user,
        amount
      }
    });

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ url: session.url })
    };

  } catch(err){
    return { statusCode:200, body: JSON.stringify({ error: err.message }) };
  }
};
