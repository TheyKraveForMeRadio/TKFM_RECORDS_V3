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
  contract_type = "future",
  entry_price,
  target_price,
  expiration_days = 30
 } = payload

 if (!catalog_id || !entry_price || !target_price) {
  return {
   statusCode: 400,
   body: JSON.stringify({ error: "missing required fields" })
  }
 }

 const expiration_date = new Date()
 expiration_date.setDate(expiration_date.getDate() + expiration_days)

 const contract = {
  catalog_id,
  contract_type,
  entry_price,
  target_price,
  expiration_date,
  created_at: new Date().toISOString()
 }

 return {
  statusCode: 200,
  body: JSON.stringify({
   status: "derivative contract created",
   contract
  })
 }

}
