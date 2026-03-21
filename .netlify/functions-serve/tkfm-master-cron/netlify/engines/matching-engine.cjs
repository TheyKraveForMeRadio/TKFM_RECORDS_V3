const { getRedis } = require("../functions/_redis")

module.exports = async (catalog_id) => {

  const redis = getRedis()
  const key = `orderbook:${catalog_id}`

  const orders = await redis.hgetall(key)
  if (!orders) return null

  const list = Object.entries(orders).map(([id, val]) => {
    const parsed = JSON.parse(val)
    parsed._id = id
    return parsed
  })

  const buys = list.filter(o => o.side === "buy").sort((a,b) => b.price - a.price)
  const sells = list.filter(o => o.side === "sell").sort((a,b) => a.price - b.price)

  if (!buys.length || !sells.length) return null

  const buy = buys[0]
  const sell = sells[0]

  if (buy.price >= sell.price) {

    const quantity = Math.min(buy.quantity, sell.quantity)

    // UPDATE REMAINING QUANTITIES
    const buyRemaining = buy.quantity - quantity
    const sellRemaining = sell.quantity - quantity

    if (buyRemaining > 0) {
      await redis.hset(key, buy._id, JSON.stringify({
        ...buy,
        quantity: buyRemaining
      }))
    } else {
      await redis.hdel(key, buy._id)
    }

    if (sellRemaining > 0) {
      await redis.hset(key, sell._id, JSON.stringify({
        ...sell,
        quantity: sellRemaining
      }))
    } else {
      await redis.hdel(key, sell._id)
    }

    return {
      matched: true,
      price: sell.price,
      quantity,
      buy,
      sell
    }

  }

  return null
}
