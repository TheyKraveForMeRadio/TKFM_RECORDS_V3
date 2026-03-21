const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()
  const params = event.queryStringParameters || {}
  const user = params.user || "demo"

  const key = `wallet:${user}`

  let wallet = await redis.get(key)

  if (!wallet) {
    wallet = {
      balance: 1000, // starting cash
      assets: {}
    }
    await redis.set(key, JSON.stringify(wallet))
  } else {
    wallet = JSON.parse(wallet)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(wallet)
  }

}
