const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()
  const params = event.queryStringParameters || {}
  const catalog_id = params.catalog_id

  if (!catalog_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "catalog_id required" })
    }
  }

  const data = await redis.hgetall(`orderbook:${catalog_id}`)

  const orders = data
    ? Object.values(data).map(JSON.parse)
    : []

  const bids = orders
    .filter(o => o.side === "buy")
    .sort((a,b) => b.price - a.price)

  const asks = orders
    .filter(o => o.side === "sell")
    .sort((a,b) => a.price - b.price)

  return {
    statusCode: 200,
    body: JSON.stringify({
      catalog_id,
      bids,
      asks
    })
  }

}
