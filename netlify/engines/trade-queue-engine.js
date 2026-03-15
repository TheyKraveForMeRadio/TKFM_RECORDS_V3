const Redis = require("ioredis")

const redis = new Redis(process.env.REDIS_URL)

exports.handler = async function(event) {

  try {

    const trade = JSON.parse(event.body)

    await redis.xadd(
      "trade_stream",
      "*",
      "catalog_id", trade.catalog_id,
      "price", trade.price,
      "quantity", trade.quantity
    )

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "trade queued"
      })
    }

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    }

  }

}
