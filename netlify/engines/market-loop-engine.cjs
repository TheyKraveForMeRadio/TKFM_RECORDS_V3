const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async () => {
  try {
    let processed = 0

    // get all queued trades
    const trades = await redis.lrange("trade_queue", 0, -1)

    const buys = []
    const sells = []

    for (let t of trades) {
      const trade = JSON.parse(t)

      if (trade.side === "buy") buys.push(trade)
      if (trade.side === "sell") sells.push(trade)
    }

    // sort:
    buys.sort((a,b) => b.price - a.price)   // highest buy first
    sells.sort((a,b) => a.price - b.price)  // lowest sell first

    for (let buy of buys) {
      for (let sell of sells) {

        if (
          buy.catalog_id === sell.catalog_id &&
          buy.price >= sell.price &&
          buy.quantity > 0 &&
          sell.quantity > 0
        ) {
          const qty = Math.min(buy.quantity, sell.quantity)
          const price = sell.price

          // update balances (simple)
          buy.quantity -= qty
          sell.quantity -= qty

          // record trade
          await redis.lpush("trades", JSON.stringify({
            catalog_id: buy.catalog_id,
            price,
            quantity: qty,
            buyer: buy.user,
            seller: sell.user,
            time: Date.now()
          }))

          processed++
        }
      }
    }

    // clear queue after processing
    await redis.del("trade_queue")

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "market loop complete",
        processed
      })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
