const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async () => {
  try {
    const buys = await redis.lrange("buy_orders", 0, -1)
    const sells = await redis.lrange("sell_orders", 0, -1)

    let executed = []

    for (let b of buys) {
      let buy = JSON.parse(b)

      for (let s of sells) {
        let sell = JSON.parse(s)

        if (
          buy.catalog_id === sell.catalog_id &&
          buy.price >= sell.price &&
          buy.quantity > 0 &&
          sell.quantity > 0
        ) {
          const qty = Math.min(buy.quantity, sell.quantity)
          const price = sell.price

          // 💸 UPDATE BALANCES
          await redis.incrbyfloat(`wallet:${sell.user}`, price * qty)
          await redis.incrbyfloat(`wallet:${buy.user}`, -(price * qty))

          // 📦 UPDATE HOLDERS
          await redis.hincrbyfloat(
            `holders:${buy.catalog_id}`,
            buy.user,
            qty
          )

          // 📉 reduce quantities
          buy.quantity -= qty
          sell.quantity -= qty

          const trade = {
            matched: true,
            catalog_id: buy.catalog_id,
            price,
            quantity: qty,
            buy,
            sell,
            executed_at: Date.now()
          }

          // 📊 SAVE TRADE
          await redis.lpush("executed_trades", JSON.stringify(trade))
          executed.push(trade)

          // 🤝 COPY TRADING (NEW)
          const followers = await redis.keys("copy:*")

          for (let f of followers){
            const follower = f.split(":")[1]
            const leader = await redis.get(f)

            if(leader === trade.buy.user){
              await redis.lpush("buy_orders", JSON.stringify({
                catalog_id: trade.catalog_id,
                price: trade.price,
                quantity: trade.quantity,
                side: "buy",
                user: follower,
                timestamp: Date.now()
              }))
            }
          }
        }
      }
    }

    // 🧹 CLEAR ORDER BOOK (SIMPLE ENGINE)
    await redis.del("buy_orders")
    await redis.del("sell_orders")

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "market loop complete",
        processed: executed.length
      })
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
