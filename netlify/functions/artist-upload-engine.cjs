const Redis = require("ioredis")
const { v4: uuidv4 } = require("uuid")

const redis = new Redis(process.env.REDIS_URL)

exports.handler = async (event) => {
  try {
    const { artist, title, price } = JSON.parse(event.body)

    const id = "asset_" + uuidv4()

    const asset = {
      id,
      artist,
      title,
      price: parseFloat(price),
      created_at: Date.now()
    }

    await redis.set(`asset:${id}`, JSON.stringify(asset))
    await redis.lpush("assets", JSON.stringify(asset))

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, asset })
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}
