exports.handler = async function(event) {

  try {

    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

    const payload = JSON.parse(event.body || "{}")

    const catalog_id = payload.catalog_id
    const price = payload.price
    const quantity = payload.quantity || 1

    if (!catalog_id || !price) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "missing catalog_id or price"
        })
      }
    }

    const trade = {
      catalog_id: catalog_id,
      price: price,
      quantity: quantity,
      created_at: new Date().toISOString()
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/catalog_trades`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(trade)
    })

    if (!res.ok) {

      const text = await res.text()

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "trade insert failed",
          detail: text
        })
      }

    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "trade executed",
        trade: trade
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
