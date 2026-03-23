const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const user = event.queryStringParameters?.user

    if(!user){
      return {
        statusCode:400,
        body:JSON.stringify({error:"missing user"})
      }
    }

    const balance = await redis.get(`wallet:${user}`) || 0

    return {
      statusCode:200,
      body:JSON.stringify({
        user,
        balance: parseFloat(balance)
      })
    }

  } catch(err){
    return {
      statusCode:500,
      body:err.message
    }
  }
}
