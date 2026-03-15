exports.handler = async function() {

  try {

    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

    /* FETCH RECENT TRADES */

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/catalog_trades?select=catalog_id,price,quantity,created_at&order=created_at.desc&limit=100`,
      {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      }
    )

    const trades = await res.json()

    if (!trades || trades.length === 0) {

      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "no trades to analyze"
        })
      }

    }

    const alerts = []

    /* GROUP TRADES BY SONG */

    const groups = {}

    for (const t of trades) {

      if (!groups[t.catalog_id]) {

        groups[t.catalog_id] = []

      }

      groups[t.catalog_id].push(t)

    }

    /* ANALYZE EACH MARKET */

    for (const catalog_id in groups) {

      const list = groups[catalog_id]

      const totalVolume =
        list.reduce((sum,t)=>sum + t.quantity,0)

      const prices =
        list.map(t=>t.price)

      const maxPrice = Math.max(...prices)
      const minPrice = Math.min(...prices)

      const priceJump = maxPrice - minPrice

      if (totalVolume > 50) {

        alerts.push({
          catalog_id,
          type: "volume_spike",
          volume: totalVolume
        })

      }

      if (priceJump > 2) {

        alerts.push({
          catalog_id,
          type: "price_manipulation",
          priceJump
        })

      }

    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "surveillance complete",
        alerts
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
