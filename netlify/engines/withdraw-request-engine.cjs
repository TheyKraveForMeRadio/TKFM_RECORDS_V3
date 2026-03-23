const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}")
    const { user, amount } = body

    // check KYC
    const kyc = JSON.parse(await redis.get(`kyc:${user}`) || "{}")

    if(kyc.status !== "approved"){
      return {
        statusCode:403,
        body:JSON.stringify({error:"kyc required"})
      }
    }

    const id = Date.now()

    await redis.lpush("withdraw_requests", JSON.stringify({
      id,
      user,
      amount,
      status:"pending",
      time:Date.now()
    }))

    return {
      statusCode:200,
      body:JSON.stringify({status:"withdraw requested", id})
    }

  } catch(err){
    return { statusCode:500, body:err.message }
  }
}
