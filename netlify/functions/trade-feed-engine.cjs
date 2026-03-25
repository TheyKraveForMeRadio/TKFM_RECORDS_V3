const Redis = require("ioredis")

const redis = new Redis(process.env.REDIS_URL)

exports.handler = async () => {
  try {
    const trades = await redis.lrange("executed_trades", 0, 50)

    const parsed = trades.map(t => JSON.parse(t))

    return {
      statusCode: 200,
      body: JSON.stringify({
        trades: parsed
      })
    }

  } catch (err) {
    return {
      statusCode: 200, // ⚠️ prevent frontend crash
      body: JSON.stringify({
        trades: []
      })
    }
  }
}
