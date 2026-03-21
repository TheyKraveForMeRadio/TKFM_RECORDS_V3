exports.handler = async function() {

  try {

    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

    /* FETCH TOP SONGS */

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/catalog_market?select=catalog_id,market_cap&order=market_cap.desc&limit=10`,
      {
        method: "GET",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      }
    )

    const songs = await res.json()

    if (!songs || songs.length === 0) {

      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "no market data"
        })
      }

    }

    /* CALCULATE ETF WEIGHTS */

    const totalCap = songs.reduce((sum, s) => sum + s.market_cap, 0)

    const holdings = songs.map(song => ({
      catalog_id: song.catalog_id,
      weight: song.market_cap / totalCap,
      market_cap: song.market_cap,
      updated_at: new Date().toISOString()
    }))

    /* CLEAR OLD ETF HOLDINGS */

    await fetch(`${SUPABASE_URL}/rest/v1/music_etf_holdings`, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    })

    /* INSERT NEW ETF HOLDINGS */

    await fetch(`${SUPABASE_URL}/rest/v1/music_etf_holdings`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(holdings)
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ETF rebalanced",
        holdings
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
