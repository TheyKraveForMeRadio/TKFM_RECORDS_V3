const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

exports.handler = async (event) => {
  try {
    const { user, amount } = JSON.parse(event.body)

    const balance = await redis.get(`wallet:${user}:balance`) || 0

    if (parseFloat(balance) < amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Insufficient funds" })
      }
    }

    // 💸 deduct balance
    await redis.decrby(`wallet:${user}:balance`, amount)

    // 🧾 log withdrawal
    await redis.lpush(`withdrawals:${user}`, JSON.stringify({
      amount,
      status: "pending",
      timestamp: Date.now()
    }))

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "withdrawal_requested",
        amount
      })
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}
