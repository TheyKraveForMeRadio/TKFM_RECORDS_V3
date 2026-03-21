const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(event) {

 const { data, error } = await supabase
  .from("catalog_market")
  .select("catalog_id, price")

 if (error) {
  return {
   statusCode: 500,
   body: JSON.stringify({ error: error.message })
  }
 }

 const trades = []

 for (const asset of data) {

  const randomMove = (Math.random()*0.1 - 0.05)
  const newPrice = asset.price + randomMove

  trades.push({
   catalog_id: asset.catalog_id,
   simulated_price: Number(newPrice.toFixed(3)),
   volume: Math.floor(Math.random()*5)+1
  })

 }

 return {
  statusCode: 200,
  body: JSON.stringify({
   liquidity_trades: trades
  })
 }

}
