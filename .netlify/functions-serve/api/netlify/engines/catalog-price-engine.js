/*
TKFM Catalog Price Engine
Compatible with Netlify runtime (no ?? operators)
*/

async function handler(event, context) {

try {

let body = {}

if (event.body) {
  try {
    body = typeof event.body === "string"
      ? JSON.parse(event.body)
      : event.body
  } catch(e){
    body = {}
  }
}

const params = event.queryStringParameters || {}

const token =
body.catalog_id || params.catalog_id

const tradePrice =
Number(body.price || params.price)

const quantity =
Number(body.quantity || params.quantity || 1)

if (!token || !tradePrice) {
return {
statusCode:400,
body:JSON.stringify({
error:"invalid trade payload"
})
}
}

const supa =
await import("@supabase/supabase-js")

const createClient = supa.createClient

const supabase =
createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/* fetch market row */

const res =
await supabase
.from("catalog_market")
.select("*")
.eq("catalog_id",token)
.maybeSingle()

const row = res.data || null

let price

if (!row) {
price = tradePrice
} else {

const prevPrice = Number(row.price || 0)
const prevVolume = Number(row.volume || 0)

const totalVol = prevVolume + quantity

if (totalVol === 0) {
price = tradePrice
} else {
price =
((prevPrice * prevVolume) +
(tradePrice * quantity))
/ totalVol
}

}

/* update market */

await supabase
.from("catalog_market")
.upsert({
catalog_id:token,
price:price,
volume:(row ? row.volume : 0) + quantity,
market_cap:price * 1000000,
updated_at:new Date().toISOString()
})

/* record trade */

await supabase
.from("catalog_trades")
.insert({
catalog_id:token,
price:tradePrice,
quantity:quantity,
created_at:new Date().toISOString()
})

/* create candle */

await supabase
.from("catalog_candles")
.insert({
catalog_id:token,
open:price,
high:price,
low:price,
close:price,
timestamp:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
status:"price updated",
catalog_id:token,
price:price
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({
error:err.message
})
}

}

}

module.exports.handler = handler
module.exports.default = { handler }

