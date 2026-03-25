const { getRedis } = require("../functions/_redis")

module.exports = async (trade) => {

  const redis = getRedis()

  const key = `orderbook:${trade.catalog_id}`

  const sideKey = trade.side === "buy" ? "bids" : "asks"

  await redis.hset(key, trade.id, JSON.stringify(trade))

  return {
    status: "added_to_orderbook",
    trade
  }

}
