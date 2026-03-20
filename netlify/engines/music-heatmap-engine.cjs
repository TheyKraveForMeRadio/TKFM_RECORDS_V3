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

 const heatmap = data.map(asset => {

  const change = (Math.random() * 10 - 5).toFixed(2) // simulate % change

  return {
   catalog_id: asset.catalog_id,
   price: asset.price,
   market_cap: asset.market_cap,
   percent_change: change,
   direction: change >= 0 ? "up" : "down"
  }

 })

 return {
  statusCode: 200,
  body: JSON.stringify({
   market_heatmap: heatmap
  })
 }

}
