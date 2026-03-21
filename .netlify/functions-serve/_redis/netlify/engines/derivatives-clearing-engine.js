exports.handler = async function(event) {

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
  entry_price,
  current_price,
  leverage = 5,
  margin = 1000
 } = payload

 if (!catalog_id || !entry_price || !current_price) {
  return {
   statusCode: 400,
   body: JSON.stringify({ error: "missing fields" })
  }
 }

 const pnl = (current_price - entry_price) * leverage
 const margin_ratio = (margin + pnl) / margin

 let status = "healthy"

 if (margin_ratio < 0.5) {
  status = "margin_call"
 }

 if (margin_ratio < 0.2) {
  status = "liquidation"
 }

 return {
  statusCode: 200,
  body: JSON.stringify({
   catalog_id,
   entry_price,
   current_price,
   leverage,
   pnl,
   margin_ratio,
   status
  })
 }

}
