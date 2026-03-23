const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const user = event.queryStringParameters.user

    const wallet = await redis.get(`wallet:${user}`)
    const xp = await redis.get(`xp:${user}`)

    return {
      statusCode: 200,
      body: JSON.stringify({ user, wallet, xp })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
