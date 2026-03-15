const engines = {

  "music-index-engine": require("../engines/music-index-engine"),
  "music-etf-rebalance-engine": require("../engines/music-etf-rebalance-engine"),
  "music-hedge-fund-engine": require("../engines/music-hedge-fund-engine"),
  "global-liquidity-engine": require("../engines/global-liquidity-engine"),
  "market-surveillance-engine": require("../engines/market-surveillance-engine"),

  "order-book-engine": require("../engines/order-book-engine"),
  "matching-engine": require("../engines/matching-engine"),

  "trade-queue-engine": require("../engines/trade-queue-engine")

}

exports.handler = async function(event, context) {

  try {

    const path = event.path || ""
    const engineName = path.split("/api/")[1]

    if (!engineName) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "engine not specified"
        })
      }
    }

    const engine = engines[engineName]

    if (!engine) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "engine not found",
          engine: engineName
        })
      }
    }

    return await engine.handler(event, context)

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    }

  }

}
