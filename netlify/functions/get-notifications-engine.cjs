const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const { user } = event.queryStringParameters

    const list = await redis.lrange(`notifications:${user}`, 0, 20)

    return {
      statusCode: 200,
      body: JSON.stringify({
        notifications: list.map(n => JSON.parse(n))
      })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
