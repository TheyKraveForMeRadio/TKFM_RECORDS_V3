const { getRedis } = require("../functions/_redis")

module.exports = async () => {

  const redis = getRedis()

  const keys = await redis.keys("user:*")

  const leaderboard = []

  for (const key of keys) {

    const user = JSON.parse(await redis.get(key))

    leaderboard.push({
      username: key.replace("user:",""),
      balance: user.balance,
      assets: user.assets
    })

  }

  leaderboard.sort((a,b) => b.balance - a.balance)

  return {
    statusCode: 200,
    body: JSON.stringify({ leaderboard })
  }

}
