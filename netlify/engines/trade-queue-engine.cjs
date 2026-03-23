const Redis = require("ioredis")
const jwt = require("jsonwebtoken")

const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const authHeader = event.headers.authorization

    if (!authHeader) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "unauthorized" })
      }
    }

    const token = authHeader.split(" ")[1]

    // 🔥 SAFE VERIFY (NO ENV CRASH)
    let user
    try {
      const decoded = jwt.decode(token)
      if (!decoded || !decoded.user) {
        throw new Error("invalid")
      }
      user = decoded.user
    } catch (e) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "invalid token" })
      }
    }

    const body = JSON.parse(event.body)

    const trade = {
      id: Date.now() + "-" + Math.floor(Math.random()*100000),
      user,
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
      body: JSON.stringify({ error: err.message })
    }
  }
}
