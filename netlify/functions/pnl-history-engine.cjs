const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const user = event.queryStringParameters.user

    const history = await redis.lrange(`pnl_history:${user}`, 0, 100)

    return {
      statusCode: 200,
      body: JSON.stringify({
        history: history.map(h => JSON.parse(h))
      })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
