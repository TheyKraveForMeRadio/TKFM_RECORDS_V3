const Stripe = require("stripe")
const Redis = require("ioredis")

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const redis = new Redis(process.env.REDIS_URL)

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"]

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object

      const user = new URL(session.success_url).searchParams.get("user")
      const amount = session.amount_total / 100

      await redis.incrby(`wallet:${user}:balance`, amount)

      console.log("💰 Deposit credited:", user, amount)
    }

    return { statusCode: 200, body: "OK" }

  } catch (err) {
    return { statusCode: 400, body: err.message }
  }
}
