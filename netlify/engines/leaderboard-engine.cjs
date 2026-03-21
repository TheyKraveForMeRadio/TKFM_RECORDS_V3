const { getRedis } = require("../functions/_redis")

module.exports = async () => {

  const redis = getRedis()

  const keys = await redis.keys("user:*")

  const leaderboard = []

  for (const key of keys) {

    const username = key.replace("user:","")
    const volume = parseFloat(await redis.get(`volume:${username}`) || "0")

    leaderboard.push({
      username,
      volume
    })

  }

  leaderboard.sort((a,b) => b.volume - a.volume)

  return {
    statusCode: 200,
    body: JSON.stringify({ leaderboard })
  }

}
