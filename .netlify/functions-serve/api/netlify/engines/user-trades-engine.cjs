const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()
  const params = event.queryStringParameters || {}
  const user = params.user || "buyer"

  const trades = await redis.lrange(`trades:${user}`, 0, 50)

  return {
    statusCode: 200,
    body: JSON.stringify({
      trades: trades.map(t => JSON.parse(t))
    })
  }

}
