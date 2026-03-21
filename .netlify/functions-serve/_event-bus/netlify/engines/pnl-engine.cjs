const { getRedis } = require("../functions/_redis")

module.exports = async (event) => {

  const redis = getRedis()
  const params = event.queryStringParameters || {}
  const user = params.user || "buyer"

  const wallet = JSON.parse(await redis.get(`wallet:${user}`) || '{}')
  const trades = (await redis.lrange(`trades:${user}`, 0, 100)).map(t => JSON.parse(t))

  const positions = {}

  // calculate avg cost
  trades.forEach(t => {

    if (!positions[t.asset]) {
      positions[t.asset] = { qty: 0, cost: 0 }
    }

    if (t.type === "buy") {
      positions[t.asset].qty += t.quantity
      positions[t.asset].cost += t.price * t.quantity
    }

    if (t.type === "sell") {
      positions[t.asset].qty -= t.quantity
      positions[t.asset].cost -= t.price * t.quantity
    }

  })

  const result = []

  let totalValue = 0

  for (const asset in positions) {

    const pos = positions[asset]

    const priceRaw = await redis.get(`price:${asset}`)
    const price = priceRaw ? JSON.parse(priceRaw).price : 0

    const avg = pos.qty ? pos.cost / pos.qty : 0
    const value = pos.qty * price
    const pnl = value - pos.cost

    totalValue += value

    result.push({
      asset,
      quantity: pos.qty,
      avg_price: avg,
      current_price: price,
      value,
      pnl
    })

  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      balance: wallet.balance,
      positions: result,
      net_worth: wallet.balance + totalValue
    })
  }

}
