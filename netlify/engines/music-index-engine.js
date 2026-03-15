const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(event) {

 const { data, error } = await supabase
  .from("catalog_market")
  .select("catalog_id, price, volume, market_cap")

 if (error) {
  return {
   statusCode: 500,
   body: JSON.stringify({ error: error.message })
  }
 }

 let totalMarketCap = 0
 let totalVolume = 0

 for (const asset of data) {
  totalMarketCap += asset.market_cap || 0
  totalVolume += asset.volume || 0
 }

 const indexValue = totalMarketCap / (data.length || 1)

 return {
  statusCode: 200,
  body: JSON.stringify({
   index_name: "TKFM INDEX",
   assets: data.length,
   total_market_cap: totalMarketCap,
   total_volume: totalVolume,
   index_value: indexValue
  })
 }

}
