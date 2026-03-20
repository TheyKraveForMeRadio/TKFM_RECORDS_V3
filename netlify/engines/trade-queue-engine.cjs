const { getRedis } = require("../functions/_redis")
const auth = require("./_auth.cjs")

module.exports = async (event) => {

  try {

    const redis = getRedis()
    const user = auth(event)

    const body = JSON.parse(event.body || "{}")

    const { catalog_id, price, quantity, side } = body

    const trade = {
      id: Date.now() + "-" + Math.floor(Math.random()*100000),
      user,
      catalog_id,
      price,
      quantity,
      side,
      timestamp: Date.now()
    }

    await redis.lpush("trade_queue", JSON.stringify(trade))

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "queued", trade })
    }

  } catch (err) {

    return {
      statusCode: 401,
      body: JSON.stringify({ error: err.message })
    }

  }

}
