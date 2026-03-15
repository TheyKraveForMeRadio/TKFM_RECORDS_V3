const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(event) {

 const { data, error } = await supabase
  .from("catalog_market")
  .select("catalog_id, price, market_cap")

 if (error) {
  return {
   statusCode: 500,
   body: JSON.stringify({ error: error.message })
  }
 }

 const yields = data.map(asset => {

  const simulatedRevenue = Math.random() * 10000
  const yieldPercent = ((simulatedRevenue / asset.market_cap) * 100).toFixed(4)

  return {
   catalog_id: asset.catalog_id,
   market_cap: asset.market_cap,
   simulated_revenue: simulatedRevenue.toFixed(2),
   yield_percent: yieldPercent
  }

 })

 return {
  statusCode: 200,
  body: JSON.stringify({
   royalty_yields: yields
  })
 }

}
