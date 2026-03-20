const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(event) {

 if (event.httpMethod !== "POST") {
  return {
   statusCode: 405,
   body: JSON.stringify({ error: "POST required" })
  }
 }

 let payload

 try {
  payload = JSON.parse(event.body)
 } catch {
  return {
   statusCode: 400,
   body: JSON.stringify({ error: "invalid JSON payload" })
  }
 }

 const {
  catalog_id,
  song_title,
  artist_name,
  initial_price = 1,
  total_shares = 1000000
 } = payload

 if (!catalog_id || !song_title || !artist_name) {
  return {
   statusCode: 400,
   body: JSON.stringify({ error: "missing required fields" })
  }
 }

 const market_cap = initial_price * total_shares

 const { error } = await supabase
  .from("catalog_market")
  .insert({
   catalog_id,
   price: initial_price,
   volume: 0,
   market_cap,
   updated_at: new Date().toISOString()
  })

 if (error) {
  return {
   statusCode: 500,
   body: JSON.stringify({ error: error.message })
  }
 }

 return {
  statusCode: 200,
  body: JSON.stringify({
   status: "IPO launched",
   catalog_id,
   song_title,
   artist_name,
   initial_price,
   total_shares,
   market_cap
  })
 }

}
