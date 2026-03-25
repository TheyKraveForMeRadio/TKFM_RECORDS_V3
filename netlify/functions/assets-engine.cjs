const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

exports.handler = async () => {
  try {
    const list = await redis.lrange("assets", 0, -1)
    const assets = list.map(a => JSON.parse(a))

    return {
      statusCode: 200,
      body: JSON.stringify({ assets })
    }

  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ assets: [] })
    }
  }
}
