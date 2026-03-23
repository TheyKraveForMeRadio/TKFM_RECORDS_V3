const Stripe = require("stripe")
const Redis = require("ioredis")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const sig = event.headers["stripe-signature"]

    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    if(stripeEvent.type === "checkout.session.completed"){
      const session = stripeEvent.data.object

      const user = session.metadata.user
      const amount = parseFloat(session.metadata.amount)

      await redis.incrbyfloat(`wallet:${user}`, amount)

      return {
        statusCode:200,
        body:"wallet credited"
      }
    }

    return { statusCode:200, body:"ok" }

  } catch(err){
    return { statusCode:400, body: err.message }
  }
}
