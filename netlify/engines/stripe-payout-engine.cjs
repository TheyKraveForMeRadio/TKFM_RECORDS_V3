const Stripe = require("stripe")
const Redis = require("ioredis")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}")
    const { request_id } = body

    const requests = await redis.lrange("withdraw_requests", 0, -1)

    const req = requests.map(r => JSON.parse(r)).find(r => r.id == request_id)

    if(!req){
      return { statusCode:404, body:"request not found" }
    }

    // ⚡ simulate payout (or connect account)
    const payout = await stripe.payouts.create({
      amount: Math.floor(req.amount * 100),
      currency: "usd"
    })

    req.status = "paid"

    await redis.lpush("payouts", JSON.stringify({
      ...req,
      payout_id: payout.id
    }))

    return {
      statusCode:200,
      body:JSON.stringify({
        status:"paid",
        payout_id: payout.id
      })
    }

  } catch(err){
    return { statusCode:500, body:err.message }
  }
}
