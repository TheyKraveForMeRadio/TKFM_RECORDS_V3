const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}")
    const { user } = body

    const kyc = JSON.parse(await redis.get(`kyc:${user}`) || "{}")

    kyc.status = "approved"

    await redis.set(`kyc:${user}`, JSON.stringify(kyc))

    return {
      statusCode:200,
      body:JSON.stringify({status:"kyc approved", user})
    }

  } catch(err){
    return { statusCode:500, body:err.message }
  }
}
