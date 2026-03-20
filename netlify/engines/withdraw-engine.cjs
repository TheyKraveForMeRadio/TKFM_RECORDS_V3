const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()
  const body = JSON.parse(event.body || "{}")

  const { user, amount } = body

  const key = `user:${user}`
  const wallet = JSON.parse(await redis.get(key))

  if (wallet.balance < amount) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "insufficient funds" })
    }
  }

  wallet.balance -= amount

  await redis.set(key, JSON.stringify(wallet))

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "withdraw requested" })
  }

}
