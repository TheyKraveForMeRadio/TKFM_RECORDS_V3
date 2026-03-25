const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const { user, message } = JSON.parse(event.body)

    await redis.lpush(`notifications:${user}`, JSON.stringify({
      message,
      time: Date.now()
    }))

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "pushed" })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
