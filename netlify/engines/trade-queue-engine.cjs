const Redis = require("ioredis")
const jwt = require("jsonwebtoken")

const redis = new Redis(process.env.REDIS_URL)

// 🔥 HARDCODE (MATCH AUTH ENGINE SECRET)
const SECRET = "supersecret123"

module.exports = async (event) => {
  try {
    const authHeader = event.headers.authorization
    if (!authHeader) {
      return { statusCode: 401, body: "no token" }
    }

    const token = authHeader.split(" ")[1]

    let user
    try {
      const decoded = jwt.verify(token, SECRET)
      user = decoded.user
    } catch (err) {
      return { statusCode: 401, body: "invalid token" }
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
      body: err.message
    }
  }
}
