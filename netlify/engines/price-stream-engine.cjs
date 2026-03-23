const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

exports.handler = async () => {
  try {
    const trades = await redis.lrange("executed_trades", 0, 50)
    const parsed = trades.map(t => JSON.parse(t))

    const last = parsed[0] || { price: 0 }

    return {
      statusCode: 200,
      body: JSON.stringify({
        price: last.price,
        trades: parsed
      })
    }

  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ price: 0, trades: [] })
    }
  }
}
