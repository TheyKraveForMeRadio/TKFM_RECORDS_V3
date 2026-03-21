const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body)

    // 💸 SEND PAYOUT (TEST MODE FIRST)
    const payout = await stripe.payouts.create({
      amount: amount * 100,
      currency: "usd"
    })

    return {
      statusCode: 200,
      body: JSON.stringify(payout)
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}
