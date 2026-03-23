const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}")

    const session = body.data?.object

    if(session && session.metadata){
      const user = session.metadata.user
      const amount = parseFloat(session.metadata.amount)

      await redis.incrbyfloat(`wallet:${user}`, amount)

      console.log("💰 WALLET CREDITED:", user, amount)
    }

    return {
      statusCode:200,
      body:"ok"
    }

  } catch(err){
    return {
      statusCode:500,
      body:err.message
    }
  }
}
