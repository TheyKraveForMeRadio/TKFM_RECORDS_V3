exports.handler = async function() {

  try {

    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

    /* FETCH MARKET */

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/catalog_market?select=catalog_id,price`,
      {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      }
    )

    const markets = await res.json()

    if (!markets || markets.length === 0) {

      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "no markets"
        })
      }

    }

    const orders = []

    for (const m of markets) {

      const spread = m.price * 0.01

      const bid = m.price - spread
      const ask = m.price + spread

      orders.push({
        catalog_id: m.catalog_id,
        side: "buy",
        price: bid,
        quantity: 1
      })

      orders.push({
        catalog_id: m.catalog_id,
        side: "sell",
        price: ask,
        quantity: 1
      })

    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "liquidity generated",
        orders
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
