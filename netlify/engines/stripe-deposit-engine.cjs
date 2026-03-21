const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
  try {
    const { amount, user } = JSON.parse(event.body)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "TKFM Wallet Deposit"
          },
          unit_amount: amount * 100
        },
        quantity: 1
      }],
      success_url: `https://tkfm-records-v3.onrender.com/deposit-success.html?user=${user}`,
      cancel_url: `https://tkfm-records-v3.onrender.com/deposit-cancel.html`
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    }

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
