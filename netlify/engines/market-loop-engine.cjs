const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async () => {
  try {
    const queue = await redis.lrange("trade_queue", 0, -1)

    let buys = []
    let sells = []

    for (let t of queue){
      const trade = JSON.parse(t)

      if(trade.side === "buy") buys.push(trade)
      if(trade.side === "sell") sells.push(trade)
    }

    let executed = []

    for (let buy of buys){
      for (let sell of sells){

        if (
          buy.catalog_id === sell.catalog_id &&
          buy.price >= sell.price &&
          buy.quantity > 0 &&
          sell.quantity > 0
        ) {
          const qty = Math.min(buy.quantity, sell.quantity)
          const price = sell.price

          // 💸 BALANCES
          await redis.incrbyfloat(`wallet:${sell.user}`, price * qty)
          await redis.incrbyfloat(`wallet:${buy.user}`, -(price * qty))

          // 📦 HOLDERS
          await redis.hincrbyfloat(`holders:${buy.catalog_id}`, buy.user, qty)

          // 📉 REDUCE
          buy.quantity -= qty
          sell.quantity -= qty

          const trade = {
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

          // 🎮 XP SYSTEM (NEW)
          await redis.incrbyfloat(`xp:${buy.user}`, 10)

          // 🤝 COPY TRADING
          const followers = await redis.keys("copy:*")

          for (let f of followers){
            const follower = f.split(":")[1]
            const leader = await redis.get(f)

            if(leader === buy.user){
              await redis.lpush("trade_queue", JSON.stringify({
                catalog_id: buy.catalog_id,
                price,
                quantity: qty,
                side: "buy",
                user: follower,
                timestamp: Date.now()
              }))
            }
          }
        }
      }
    }

    // 🧹 CLEAR QUEUE
    await redis.del("trade_queue")

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
