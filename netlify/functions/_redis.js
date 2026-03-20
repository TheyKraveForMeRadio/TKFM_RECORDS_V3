const Redis = require("ioredis")

let redisClient = null

function getRedis() {

  if (!redisClient) {

    const url = process.env.REDIS_URL

    if (!url) {
      throw new Error("REDIS_URL environment variable is not set")
    }

    redisClient = new Redis(url, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false
    })

    redisClient.on("error", (err) => {
      console.error("Redis connection error:", err)
    })

    console.log("TKFM Redis client initialized")

  }

  return redisClient
}

module.exports = { getRedis }
