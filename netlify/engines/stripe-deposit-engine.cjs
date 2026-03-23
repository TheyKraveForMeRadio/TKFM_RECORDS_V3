const Stripe = require("stripe")
const Redis = require("ioredis")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}")
    const { user, amount } = body

    if(!amount || amount <= 0){
      return { statusCode:400, body:"invalid amount" }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: "TKFM Wallet Deposit" },
          unit_amount: Math.floor(amount * 100)
        },
        quantity: 1
      }],
      success_url: process.env.SELF_BASE_URL + "/success.html",
      cancel_url: process.env.SELF_BASE_URL + "/cancel.html",
      metadata: {
        user,
        amount
      }
    })

    return {
      statusCode:200,
      body: JSON.stringify({ url: session.url })
    }

  } catch(err){
    return { statusCode:500, body: err.message }
  }
}
