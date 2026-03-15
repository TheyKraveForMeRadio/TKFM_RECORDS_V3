const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(event) {

 const catalog_id =
  event.queryStringParameters?.catalog_id || "song123"

 const { data, error } = await supabase
  .from("catalog_trades")
  .select("price, quantity")
  .eq("catalog_id", catalog_id)
  .order("price", { ascending: false })
  .limit(50)

 if (error) {
  return {
   statusCode: 500,
   body: JSON.stringify({ error: error.message })
  }
 }

 const bids = []
 const asks = []

 for (const trade of data) {

  if (Math.random() > 0.5) {
   bids.push(trade)
  } else {
   asks.push(trade)
  }

 }

 return {
  statusCode: 200,
  body: JSON.stringify({
   catalog_id,
   orderbook: {
    bids,
    asks
   }
  })
 }

}
