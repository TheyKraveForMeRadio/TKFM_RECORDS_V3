const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

// 🔐 AUTH
const auth = require("./auth-middleware.cjs")

module.exports = async (event) => {
  try {
    // 🔐 GET USER FROM TOKEN
    const user = auth(event)
    if(!user){
      return {
        statusCode: 401,
        body: "unauthorized"
      }
    }

    const body = JSON.parse(event.body)

    const trade = {
      id: Date.now() + "-" + Math.floor(Math.random()*100000),
      user: user, // 🔥 REPLACED
      catalog_id: body.catalog_id,
      price: body.price,
      quantity: body.quantity,
      side: body.side,
      timestamp: Date.now()
    }

    await redis.lpush("trade_queue", JSON.stringify(trade))

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "queued", trade })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
