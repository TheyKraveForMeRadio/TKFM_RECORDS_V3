const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const user = event.queryStringParameters.user

    const wallet = parseFloat(await redis.get(`wallet:${user}`)) || 0
    const trades = await redis.lrange("executed_trades", 0, -1)

    let invested = 0
    let current = wallet

    for (let t of trades){
      const trade = JSON.parse(t)

      if(trade.buy?.user === user){
        invested += trade.price * trade.quantity
      }
    }

    const pnl = current - invested
    const roi = invested > 0 ? (pnl / invested) * 100 : 0

    return {
      statusCode: 200,
      body: JSON.stringify({
        wallet,
        invested,
        pnl,
        roi
      })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
