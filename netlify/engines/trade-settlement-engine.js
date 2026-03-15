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

    /* UPDATE MARKET PRICE */

    const marketUpdate = await fetch(
      `${SUPABASE_URL}/rest/v1/catalog_market?catalog_id=eq.${catalog_id}`,
      {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          price: price,
          volume: quantity,
          updated_at: new Date().toISOString()
        })
      }
    )

    if (!marketUpdate.ok) {

      const text = await marketUpdate.text()

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "market update failed",
          detail: text
        })
      }

    }

    /* INSERT CANDLE */

    const candle = {
      catalog_id: catalog_id,
      open: price,
      high: price,
      low: price,
      close: price,
      timestamp: new Date().toISOString()
    }

    await fetch(`${SUPABASE_URL}/rest/v1/catalog_candles`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(candle)
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "trade settled",
        catalog_id,
        price,
        quantity
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
