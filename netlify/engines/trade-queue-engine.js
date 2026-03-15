const Redis = require("ioredis")

const redis = new Redis(process.env.REDIS_URL)

exports.handler = async function(event) {

  try {

    const trade = JSON.parse(event.body || "{}")

    if (!trade.catalog_id || !trade.price || !trade.quantity || !trade.side) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "invalid trade payload" })
      }
    }

    const entry = await redis.xadd(
      "tkfm_trade_stream",
      "*",
      "catalog_id", trade.catalog_id,
      "price", trade.price,
      "quantity", trade.quantity,
      "side", trade.side
    )

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "trade queued",
        id: entry
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
