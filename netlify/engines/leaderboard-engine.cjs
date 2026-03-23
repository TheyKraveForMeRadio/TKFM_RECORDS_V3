const Redis = require("ioredis")
const redis = new Redis(process.env.REDIS_URL)

module.exports = async () => {
  try {
    const keys = await redis.keys("wallet:*")

    let users = []

    for (let key of keys){
      const user = key.split(":")[1]
      const balance = parseFloat(await redis.get(key)) || 0

      users.push({ user, balance })
    }

    users.sort((a,b)=> b.balance - a.balance)

    return {
      statusCode: 200,
      body: JSON.stringify({ leaderboard: users.slice(0,20) })
    }

  } catch(err){
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
