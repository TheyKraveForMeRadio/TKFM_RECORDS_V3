const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()

  const params = event.queryStringParameters || {}
  const catalog = params.catalog_id || "song123"

  const trades = await redis.lrange("executed_trades", 0, 50)
  const priceRaw = await redis.get(`price:${catalog}`)

  return {
    statusCode: 200,
    body: JSON.stringify({
      trades: trades.map(t => JSON.parse(t)),
      price: priceRaw ? JSON.parse(priceRaw) : null
    })
  }

}
