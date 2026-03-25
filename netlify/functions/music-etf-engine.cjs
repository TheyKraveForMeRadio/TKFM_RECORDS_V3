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

 if (!data || data.length === 0) {
  return {
   statusCode: 200,
   body: JSON.stringify({ message: "no assets available" })
  }
 }

 // Simple ETF: equal weight basket
 const etfAssets = data.slice(0, 5)

 let totalValue = 0

 for (const asset of etfAssets) {
  totalValue += asset.price
 }

 const etfPrice = totalValue / etfAssets.length

 return {
  statusCode: 200,
  body: JSON.stringify({
   etf_name: "TKFM GLOBAL MUSIC ETF",
   assets_included: etfAssets.length,
   etf_price: etfPrice,
   holdings: etfAssets
  })
 }

}
