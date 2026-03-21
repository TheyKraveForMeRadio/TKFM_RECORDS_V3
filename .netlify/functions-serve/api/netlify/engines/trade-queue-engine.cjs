const { getRedis } = require("../functions/_redis")

module.exports.handler = async (event) => {

  try {

    const redis = getRedis()

    const body = event.body ? JSON.parse(event.body) : {}

    const { catalog_id, price, quantity, side } = body

    if (!catalog_id || !price || !quantity || !side) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "invalid trade payload"
        })
      }
    }

    const trade = {
      id: Date.now() + "-" + Math.floor(Math.random()*100000),
      catalog_id,
      price,
      quantity,
      side,
      timestamp: Date.now()
    }

    await redis.lpush("trade_queue", JSON.stringify(trade))

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "queued",
        trade
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
