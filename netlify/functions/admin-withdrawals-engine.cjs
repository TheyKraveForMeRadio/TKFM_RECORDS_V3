const Redis = require("ioredis")
const Stripe = require("stripe")

const redis = new Redis(process.env.REDIS_URL)
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
  try {
    const { action, user, index } = event.queryStringParameters || {}

    if (!action) {
      const users = await redis.keys("withdrawals:*")
      let all = []

      for (const key of users) {
        const u = key.split(":")[1]
        const list = await redis.lrange(key, 0, -1)

        list.forEach((item, i)=>{
          all.push({
            user: u,
            index: i,
            ...JSON.parse(item)
          })
        })
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ withdrawals: all })
      }
    }

    if (action === "approve") {
      const key = `withdrawals:${user}`
      const item = await redis.lindex(key, index)

      if (!item) return { statusCode: 404, body: "Not found" }

      const data = JSON.parse(item)

      // 💸 STRIPE PAYOUT
      const payout = await stripe.payouts.create({
        amount: data.amount * 100,
        currency: "usd"
      })

      data.status = "paid"
      data.payout_id = payout.id

      await redis.lset(key, index, JSON.stringify(data))

      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "paid",
          payout_id: payout.id
        })
      }
    }

    return { statusCode: 400, body: "Invalid action" }

  } catch (err) {
    return { statusCode: 500, body: err.message }
  }
}
