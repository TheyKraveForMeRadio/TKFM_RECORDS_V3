const Redis = require("ioredis")

const redis = new Redis(process.env.REDIS_URL)

exports.handler = async (event) => {
  try {
    const { catalog_id } = event.queryStringParameters

    const orders = await redis.lrange(`orderbook:${catalog_id}`, 0, -1)

    const parsed = orders.map(o => JSON.parse(o))

    const bids = parsed.filter(o=>o.side==="buy")
    const asks = parsed.filter(o=>o.side==="sell")

    return {
      statusCode: 200,
      body: JSON.stringify({
        bids,
        asks
      })
    }

  } catch (err) {
    return {
      statusCode: 200, // ⚠️ DO NOT BREAK UI
      body: JSON.stringify({
        bids: [],
        asks: []
      })
    }
  }
}
