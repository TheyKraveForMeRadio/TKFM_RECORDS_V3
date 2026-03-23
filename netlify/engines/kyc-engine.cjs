const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}")
    const { user, name, email } = body

    if(!user) {
      return { statusCode:400, body:JSON.stringify({error:"missing user"}) }
    }

    // save KYC
    await redis.set(`kyc:${user}`, JSON.stringify({
      user,
      name,
      email,
      status: "pending",
      time: Date.now()
    }))

    return {
      statusCode:200,
      body:JSON.stringify({status:"kyc submitted"})
    }

  } catch(err){
    return { statusCode:500, body:err.message }
  }
}
