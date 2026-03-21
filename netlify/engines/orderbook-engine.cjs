const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()
  const catalog_id = event.queryStringParameters?.catalog_id

  const orders = await redis.lrange("orderbook", 0, 200)

  const bids = []
  const asks = []

  orders.forEach(o => {
    const order = JSON.parse(o)

    if(order.catalog_id !== catalog_id) return

    if(order.side === "buy") bids.push(order)
    if(order.side === "sell") asks.push(order)
  })

  bids.sort((a,b)=> b.price - a.price)
  asks.sort((a,b)=> a.price - b.price)

  return {
    statusCode: 200,
    body: JSON.stringify({ bids, asks })
  }

}
