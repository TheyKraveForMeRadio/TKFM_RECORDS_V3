const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

function getLevel(xp){
  return Math.floor(xp / 100) + 1
}

module.exports = async (event) => {
  try {
    const { user, amount } = JSON.parse(event.body)

    // add xp (0 = just read)
    if(amount > 0){
      await redis.incrbyfloat(`xp:${user}`, amount)
    }

    const xp = parseFloat(await redis.get(`xp:${user}`)) || 0
    const level = getLevel(xp)

    return {
      statusCode: 200,
      body: JSON.stringify({ xp, level })
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
