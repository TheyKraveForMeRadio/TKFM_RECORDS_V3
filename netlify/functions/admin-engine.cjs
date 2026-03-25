const { getRedis } = require("../functions/_redis")

module.exports = async () => {

  const redis = getRedis()

  const treasury = await redis.get("treasury:fees") || "0"
  const trades = await redis.lrange("executed_trades", 0, 20)

  return {
    statusCode: 200,
    body: JSON.stringify({
      total_fees: parseFloat(treasury),
      recent_trades: trades.map(t => JSON.parse(t))
    })
  }

}
