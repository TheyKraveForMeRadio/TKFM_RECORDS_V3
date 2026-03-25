const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()
  const user = event.queryStringParameters?.user

  const volume = parseFloat(await redis.get(`volume:${user}`) || "0")
  const wallet = JSON.parse(await redis.get(`user:${user}`) || "{}")

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
      volume,
      balance: wallet.balance || 0,
      assets: wallet.assets || {}
    })
  }

}
