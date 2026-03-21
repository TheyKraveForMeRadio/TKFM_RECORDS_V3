const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()
  const catalog_id = event.queryStringParameters?.catalog_id

  const trades = await redis.lrange("executed_trades", 0, 100)

  const candles = []

  trades.reverse().forEach(t => {

    const trade = JSON.parse(t)

    if(trade.buy?.catalog_id !== catalog_id) return

    candles.push({
      open: trade.price,
      high: trade.price,
      low: trade.price,
      close: trade.price,
      time: trade.executed_at
    })

  })

  return {
    statusCode: 200,
    body: JSON.stringify({ candles })
  }

}
