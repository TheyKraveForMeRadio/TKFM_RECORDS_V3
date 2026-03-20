const { getRedis } = require("../functions/_redis")
const orderBook = require("./order-book-engine.cjs")
const matchEngine = require("./matching-engine.cjs")
const priceOracle = require("./price-oracle-engine.cjs")

const FEE_RATE = 0.005

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

      // 🔥 BLOCK SELF TRADES
      if (match.buy.user === match.sell.user) {
        console.log("⚠️ SELF TRADE BLOCKED")
        continue
      }

      const fee = match.price * match.quantity * FEE_RATE

      await redis.lpush("executed_trades", JSON.stringify({
        ...match,
        fee,
        executed_at: Date.now()
      }))

      await priceOracle(match)

      const buyerKey = `user:${match.buy.user}`
      const sellerKey = `user:${match.sell.user}`
      const treasuryKey = `treasury:fees`

      const buyer = JSON.parse(await redis.get(buyerKey))
      const seller = JSON.parse(await redis.get(sellerKey))

      const cost = match.price * match.quantity

      buyer.balance -= (cost + fee)
      buyer.assets[match.buy.catalog_id] = (buyer.assets[match.buy.catalog_id] || 0) + match.quantity

      seller.balance += (cost - fee)
      seller.assets[match.sell.catalog_id] = (seller.assets[match.sell.catalog_id] || 0) - match.quantity

      const treasury = parseFloat(await redis.get(treasuryKey) || "0")
      await redis.set(treasuryKey, treasury + fee)

      await redis.set(buyerKey, JSON.stringify(buyer))
      await redis.set(sellerKey, JSON.stringify(seller))

      console.log("💰 FEE COLLECTED:", fee)

    }

    processed++
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "market loop complete", processed })
  }

}
