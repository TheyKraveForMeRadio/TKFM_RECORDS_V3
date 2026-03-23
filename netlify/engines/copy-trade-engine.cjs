const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const { leader, follower } = JSON.parse(event.body)

    await redis.set(`copy:${follower}`, leader)

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "copy enabled", leader, follower })
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
