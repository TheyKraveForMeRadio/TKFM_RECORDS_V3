const { getRedis } = require("../functions/_redis")
const orderBook = require("./order-book-engine.cjs")
const matchEngine = require("./matching-engine.cjs")
const priceOracle = require("./price-oracle-engine.cjs")

module.exports = async () => {

  const redis = getRedis()
  let processed = 0

  while (true) {

    const tradeRaw = await redis.rpop("trade_queue")
    if (!tradeRaw) break

    const trade = JSON.parse(tradeRaw)

    await orderBook(trade)

    const match = await matchEngine(trade.catalog_id)

    if (match && match.matched) {

      await redis.lpush("executed_trades", JSON.stringify({
        ...match,
        executed_at: Date.now()
      }))

      await priceOracle(match)

      // WALLET UPDATE
      const buyerKey = `wallet:buyer`
      const sellerKey = `wallet:seller`

      const buyer = JSON.parse(await redis.get(buyerKey) || '{"balance":1000,"assets":{}}')
      const seller = JSON.parse(await redis.get(sellerKey) || '{"balance":1000,"assets":{}}')

      const cost = match.price * match.quantity

      buyer.balance -= cost
      buyer.assets[match.buy.catalog_id] = (buyer.assets[match.buy.catalog_id] || 0) + match.quantity

      seller.balance += cost
      seller.assets[match.sell.catalog_id] = (seller.assets[match.sell.catalog_id] || 0) - match.quantity

      await redis.set(buyerKey, JSON.stringify(buyer))
      await redis.set(sellerKey, JSON.stringify(seller))

      // 🔥 TRADE HISTORY TRACKING (ADDED)
      await redis.lpush(`trades:buyer`, JSON.stringify({
        type: "buy",
        asset: match.buy.catalog_id,
        price: match.price,
        quantity: match.quantity,
        timestamp: Date.now()
      }))

      await redis.lpush(`trades:seller`, JSON.stringify({
        type: "sell",
        asset: match.sell.catalog_id,
        price: match.price,
        quantity: match.quantity,
        timestamp: Date.now()
      }))

      console.log("💰 WALLET + TRADE HISTORY UPDATED")

    }

    processed++
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "market loop complete", processed })
  }

}
