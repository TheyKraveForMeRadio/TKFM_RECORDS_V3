const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async () => {
  try {
    const users = await redis.keys("wallet:*")

    for (let key of users){
      const user = key.split(":")[1]

      const amount = Math.random() * 3

      await redis.incrbyfloat(`wallet:${user}`, amount)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "airdrop complete" })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
