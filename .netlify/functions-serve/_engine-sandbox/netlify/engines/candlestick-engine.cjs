const { getRedis } = require("../functions/_redis")

module.exports = async () => {

  const redis = getRedis()

  const trades = await redis.lrange("executed_trades", 0, 100)

  if (!trades.length) {
    return {
      statusCode: 200,
      body: JSON.stringify({ candles: [] })
    }
  }

  const parsed = trades.map(t => JSON.parse(t)).reverse()

  const candles = []

  const interval = 60000 // 1 minute

  let bucket = null

  parsed.forEach(t => {

    const time = Math.floor(t.executed_at / interval) * interval

    if (!bucket || bucket.time !== time) {

      if (bucket) candles.push(bucket)

      bucket = {
        time,
        open: t.price,
        high: t.price,
        low: t.price,
        close: t.price
      }

    } else {

      bucket.high = Math.max(bucket.high, t.price)
      bucket.low = Math.min(bucket.low, t.price)
      bucket.close = t.price

    }

  })

  if (bucket) candles.push(bucket)

  return {
    statusCode: 200,
    body: JSON.stringify({ candles })
  }

}
