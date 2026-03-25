const { getRedis } = require("../functions/_redis")

module.exports = async (match) => {

  const redis = getRedis()

  const catalog = match.buy.catalog_id

  await redis.set(`price:${catalog}`, JSON.stringify({
    price: match.price,
    timestamp: Date.now()
  }))

}
