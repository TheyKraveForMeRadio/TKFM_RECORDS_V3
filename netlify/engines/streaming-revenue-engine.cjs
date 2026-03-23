const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

exports.handler = async () => {
  try {
    const assets = await redis.lrange("assets", 0, -1)

    for (let a of assets) {
      const asset = JSON.parse(a)

      // 🎧 simulate streaming revenue
      const revenue = Math.random() * 5

      await redis.incrbyfloat(`revenue:${asset.id}`, revenue)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "revenue updated" })
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
