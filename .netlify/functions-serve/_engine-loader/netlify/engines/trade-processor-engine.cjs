const { getRedis } = require("../functions/_redis")

module.exports = async () => {

  try {

    const redis = getRedis()

    const tradeRaw = await redis.rpop("trade_queue")

    if (!tradeRaw) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "no trades"
        })
      }
    }

    const trade = JSON.parse(tradeRaw)

    console.log("Processing trade:", trade.id)

    await redis.lpush("executed_trades", JSON.stringify({
      ...trade,
      status: "executed"
    }))

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "processed",
        trade
      })
    }

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    }

  }

}
