const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const { user } = event.queryStringParameters

    const trades = await redis.lrange("executed_trades", 0, 100)
    const wallet = parseFloat(await redis.get(`wallet:${user}`)) || 0

    let count = 0
    for (let t of trades){
      const trade = JSON.parse(t)
      if(trade.buy?.user === user) count++
    }

    let badges = []

    if(count >= 1) badges.push("First Trade")
    if(count >= 10) badges.push("Active Trader")
    if(count >= 50) badges.push("Market Grinder")
    if(wallet >= 1000) badges.push("Whale")

    await redis.set(`badges:${user}`, JSON.stringify(badges))

    return {
      statusCode: 200,
      body: JSON.stringify({ badges })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
