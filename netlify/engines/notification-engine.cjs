const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const { user, message } = JSON.parse(event.body)

    const notif = {
      message,
      time: Date.now()
    }

    await redis.lpush(`notifications:${user}`, JSON.stringify(notif))

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "sent" })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
