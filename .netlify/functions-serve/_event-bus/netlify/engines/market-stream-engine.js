exports.handler = async function(event) {

  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/catalog_market?select=catalog_id,price,volume,market_cap`,
    {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    }
  )

  const markets = await res.json()

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    },
    body: `data: ${JSON.stringify({
      time: Date.now(),
      markets
    })}\n\n`
  }

}
