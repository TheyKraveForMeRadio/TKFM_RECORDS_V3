const Redis = require("ioredis")
const fetch = require("node-fetch")

const redis = new Redis(process.env.REDIS_URL)

const STREAM = "tkfm_trade_stream"
const GROUP = "trade_processors"
const CONSUMER = "worker_1"

async function ensureGroup() {
  try {
    await redis.xgroup("CREATE", STREAM, GROUP, "$", "MKSTREAM")
  } catch (e) {}
}

exports.handler = async function() {

  try {

    await ensureGroup()

    const result = await redis.xreadgroup(
      "GROUP",
      GROUP,
      CONSUMER,
      "COUNT",
      10,
      "BLOCK",
      1000,
      "STREAMS",
      STREAM,
      ">"
    )

    if (!result) {
      return {
        statusCode:200,
        body:JSON.stringify({status:"no trades"})
      }
    }

    const trades = result[0][1]

    for (const trade of trades) {

      const id = trade[0]
      const fields = trade[1]

      const tradeData = {}

      for (let i = 0; i < fields.length; i += 2) {
        tradeData[fields[i]] = fields[i + 1]
      }

      await fetch(process.env.SELF_BASE_URL + "/.netlify/functions/api/matching-engine", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(tradeData)
      })

      await redis.xack(STREAM, GROUP, id)

    }

    return {
      statusCode:200,
      body:JSON.stringify({
        status:"trades processed",
        count:trades.length
      })
    }

  } catch(err) {

    return {
      statusCode:500,
      body:JSON.stringify({error:err.message})
    }

  }

}
