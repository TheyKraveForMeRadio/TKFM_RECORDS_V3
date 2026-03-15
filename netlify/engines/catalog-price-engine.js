/*
CATALOG PRICE ENGINE
CommonJS + ESM compatible
*/

async function handler(event,context){

try{

let body={}

if(event.body){
try{
body = typeof event.body==="string"
? JSON.parse(event.body)
: event.body
}catch(e){}
}

const qs = event.queryStringParameters || {}

const token =
body.catalog_id || qs.catalog_id

const tradePrice =
Number(body.price || qs.price)

const quantity =
Number(body.quantity || qs.quantity || 1)

if(!token || !tradePrice){

return{
statusCode:400,
body:JSON.stringify({
error:"invalid trade payload"
})
}

}

const mod =
await import("@supabase/supabase-js")

const createClient =
mod.createClient

const supabase =
createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/* get existing row */

const { data:row } =
await supabase
.from("catalog_market")
.select("*")
.eq("catalog_id",token)
.maybeSingle()

let prevPrice =
row && row.price
? Number(row.price)
: null

let prevVolume =
row && row.volume
? Number(row.volume)
: 0

let newPrice

if(prevPrice===null){
newPrice = tradePrice
}else{

const totalQty =
prevVolume + quantity

newPrice =
((prevPrice * prevVolume)
+ (tradePrice * quantity))
/ totalQty

}

const newVolume =
prevVolume + quantity

const marketCap =
newPrice * 1000000

await supabase
.from("catalog_market")
.upsert({

catalog_id:token,
price:newPrice,
volume:newVolume,
market_cap:marketCap,
updated_at:new Date().toISOString()

},{onConflict:"catalog_id"})

await supabase
.from("catalog_trades")
.insert({

catalog_id:token,
price:tradePrice,
quantity:quantity,
created_at:new Date().toISOString()

})

await supabase
.from("catalog_candles")
.insert({

catalog_id:token,
open:newPrice,
high:newPrice,
low:newPrice,
close:newPrice,
timestamp:new Date().toISOString()

})

return{

statusCode:200,
body:JSON.stringify({

status:"price updated",
catalog_id:token,
price:newPrice,
volume:newVolume,
market_cap:marketCap

})

}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({
error:err.message
})
}

}

}

module.exports.handler = handler
module.exports.default = {handler}

