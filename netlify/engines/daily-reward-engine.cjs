const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async (event) => {
  try {
    const { user } = JSON.parse(event.body)

    const today = new Date().toDateString()
    const last = await redis.get(`daily:${user}`)

    if(last === today){
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "already claimed" })
      }
    }

    const reward = 5

    await redis.set(`daily:${user}`, today)
    await redis.incrbyfloat(`wallet:${user}`, reward)

    return {
      statusCode: 200,
      body: JSON.stringify({ reward })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
