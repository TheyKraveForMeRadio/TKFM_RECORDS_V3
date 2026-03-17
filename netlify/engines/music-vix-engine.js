const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function () {

  try {

    const { data, error } = await supabase
      .from("catalog_price_history")
      .select("catalog_id, price, timestamp")
      .order("timestamp", { ascending: false })
      .limit(200)

    if (error) throw error

    const priceMap = {}

    for (const row of data) {

      if (!priceMap[row.catalog_id]) {
        priceMap[row.catalog_id] = []
      }

      priceMap[row.catalog_id].push(row.price)

    }

    let volatilitySum = 0
    let assets = 0

    for (const catalogId in priceMap) {

      const prices = priceMap[catalogId]

      if (prices.length < 2) continue

      let returns = []

      for (let i = 1; i < prices.length; i++) {

        const r = (prices[i] - prices[i - 1]) / prices[i - 1]
        returns.push(r)

      }

      const avg =
        returns.reduce((a, b) => a + b, 0) / returns.length

      const variance =
        returns.reduce((a, b) => a + Math.pow(b - avg, 2), 0) /
        returns.length

      const volatility = Math.sqrt(variance)

      volatilitySum += volatility
      assets++

    }

    const vix = assets > 0 ? volatilitySum / assets : 0

    return {
      statusCode: 200,
      body: JSON.stringify({
        index_name: "TKFM MUSIC VIX",
        tracked_assets: assets,
        volatility_index: Number((vix * 100).toFixed(4))
      })
    }

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    }

  }

}
