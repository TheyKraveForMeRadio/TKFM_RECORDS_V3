const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()
  const params = event.queryStringParameters || {}
  const user = params.user || "buyer"

  const wallet = JSON.parse(await redis.get(`wallet:${user}`) || '{}')

  const portfolio = []

  for (const asset in wallet.assets || {}) {

    const qty = wallet.assets[asset]
    const priceRaw = await redis.get(`price:${asset}`)

    const price = priceRaw ? JSON.parse(priceRaw).price : 0

    portfolio.push({
      asset,
      quantity: qty,
      value: qty * price
    })

  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      balance: wallet.balance,
      portfolio
    })
  }

}
