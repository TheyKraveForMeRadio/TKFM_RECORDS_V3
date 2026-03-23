const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const { user } = JSON.parse(event.body)

    const trades = await redis.lrange("executed_trades", 0, 100)

    let count = 0
    for (let t of trades){
      const trade = JSON.parse(t)
      if(trade.buy?.user === user) count++
    }

    if(count < 3){
      return {
        statusCode: 200,
        body: JSON.stringify({ error: "mission not complete" })
      }
    }

    const claimed = await redis.get(`mission:${user}`)

    if(claimed){
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "already claimed" })
      }
    }

    const reward = 10

    await redis.set(`mission:${user}`, "claimed")
    await redis.incrbyfloat(`wallet:${user}`, reward)

    return {
      statusCode: 200,
      body: JSON.stringify({ reward })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
