const { getRedis } = require("../functions/_redis")

module.exports = async () => {

  const redis = getRedis()

  const trades = await redis.lrange("executed_trades", 0, 50)

  return {
    statusCode: 200,
    body: JSON.stringify({
      trades: trades.map(t => JSON.parse(t))
    })
  }

}
