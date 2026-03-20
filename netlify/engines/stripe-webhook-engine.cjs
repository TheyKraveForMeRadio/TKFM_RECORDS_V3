const Stripe = require("stripe")
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()
  const sig = event.headers["stripe-signature"]

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  const stripeEvent = stripe.webhooks.constructEvent(
    event.body,
    sig,
    webhookSecret
  )

  if (stripeEvent.type === "checkout.session.completed") {

    const session = stripeEvent.data.object

    const amount = session.amount_total / 100
    const user = "user1" // 🔥 later: pull from metadata

    const key = `user:${user}`
    const wallet = JSON.parse(await redis.get(key))

    wallet.balance += amount

    await redis.set(key, JSON.stringify(wallet))

    console.log("💰 DEPOSIT ADDED:", amount)

  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true })
  }

}
