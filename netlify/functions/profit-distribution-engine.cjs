const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async () => {
  try {
    const assets = await redis.lrange("assets", 0, -1)

    for (let a of assets) {
      const asset = JSON.parse(a)

      const revenue = parseFloat(await redis.get(`revenue:${asset.id}`)) || 0

      if (revenue <= 0) continue

      const holders = await redis.hgetall(`holders:${asset.id}`)

      let totalShares = 0
      for (let u in holders) {
        totalShares += parseFloat(holders[u])
      }

      for (let user in holders) {
        const share = parseFloat(holders[user])
        const payout = (share / totalShares) * revenue

        // 💰 PAY USER
        await redis.incrbyfloat(`wallet:${user}`, payout)

        // 📈 TRACK PNL HISTORY (NEW)
        const balance = parseFloat(await redis.get(`wallet:${user}`)) || 0

        await redis.lpush(`pnl_history:${user}`, JSON.stringify({
          time: Date.now(),
          balance
        }))
      }

      // 🔁 RESET REVENUE AFTER DISTRIBUTION
      await redis.set(`revenue:${asset.id}`, 0)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "profits distributed" })
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
