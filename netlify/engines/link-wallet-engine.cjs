const Redis = require("ioredis")
const jwt = require("jsonwebtoken")

const redis = new Redis(process.env.REDIS_URL)
const SECRET = process.env.TKFM_JWT_SECRET

module.exports = async (event) => {
  try {
    const token = event.headers.authorization?.split(" ")[1]

    const decoded = jwt.verify(token, SECRET)
    const user = decoded.user

    const { wallet } = JSON.parse(event.body)

    await redis.set(`wallet_address:${user}`, wallet)

    return {
      statusCode:200,
      body:JSON.stringify({
        status:"wallet linked",
        user,
        wallet
      })
    }

  } catch(err){
    return {
      statusCode:401,
      body:JSON.stringify({error:"unauthorized"})
    }
  }
}
