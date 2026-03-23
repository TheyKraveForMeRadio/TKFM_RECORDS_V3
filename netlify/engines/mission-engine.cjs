const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const { user } = event.queryStringParameters

    const trades = await redis.lrange("executed_trades", 0, 100)

    let count = 0
    for (let t of trades){
      const trade = JSON.parse(t)
      if(trade.buy?.user === user) count++
    }

    const completed = count >= 3

    return {
      statusCode: 200,
      body: JSON.stringify({
        mission: "Make 3 trades",
        progress: count,
        completed
      })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
