exports.handler = async function() {

  try {

    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

    /* FETCH MARKET DATA */

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/catalog_market?select=catalog_id,price,volume,market_cap`,
      {
        method: "GET",
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
          error: "no market data"
        })
      }

    }

    /* SCORE SONGS */

    const scored = markets.map(m => {

      const score =
        (m.market_cap * 0.5) +
        (m.volume * 0.3) +
        (m.price * 0.2)

      return {
        catalog_id: m.catalog_id,
        score
      }

    })

    /* SORT BY SCORE */

    scored.sort((a,b) => b.score - a.score)

    /* SELECT TOP 5 */

    const portfolio = scored.slice(0,5)

    /* ALLOCATE CAPITAL */

    const totalScore = portfolio.reduce((s,p)=>s+p.score,0)

    const allocations = portfolio.map(p => ({
      catalog_id: p.catalog_id,
      allocation: p.score / totalScore,
      updated_at: new Date().toISOString()
    }))

    /* CLEAR OLD PORTFOLIO */

    await fetch(`${SUPABASE_URL}/rest/v1/music_hedge_fund_portfolio`, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    })

    /* INSERT NEW PORTFOLIO */

    await fetch(`${SUPABASE_URL}/rest/v1/music_hedge_fund_portfolio`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(allocations)
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "hedge fund rebalanced",
        allocations
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
