const { getRedis } = require("../functions/_redis")

module.exports = async () => {

  const redis = getRedis()

  const trades = await redis.lrange("executed_trades", 0, 20)

  const parsed = trades.map(t => JSON.parse(t))

  return {
    statusCode: 200,
    body: JSON.stringify({
      trades: parsed
    })
  }

}
