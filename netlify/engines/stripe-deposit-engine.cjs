const Stripe = require("stripe")

exports.handler = async (event) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return {
        statusCode: 200,
        body: JSON.stringify({ error: "Stripe not configured" })
      }
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
    const { amount, user } = JSON.parse(event.body)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: "TKFM Deposit" },
          unit_amount: amount * 100
        },
        quantity: 1
      }],
      success_url: `http://localhost:3000/deposit-success.html`,
      cancel_url: `http://localhost:3000/trading-app.html`
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    }

  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: err.message })
    }
  }
}
