const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async () => {
  try {
    const trades = await redis.lrange("executed_trades", 0, 200)

    let volume = {}

    for (let t of trades){
      const trade = JSON.parse(t)

      const val = trade.price * trade.quantity

      volume[trade.buy.user] = (volume[trade.buy.user] || 0) + val
      volume[trade.sell.user] = (volume[trade.sell.user] || 0) + val
    }

    let arr = Object.keys(volume).map(u => ({
      user: u,
      volume: volume[u]
    }))

    arr.sort((a,b)=> b.volume - a.volume)

    return {
      statusCode: 200,
      body: JSON.stringify({ traders: arr.slice(0,20) })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
