const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async ()=>{

try{

const { data: trades } = await supabase
.from("trades")
.select("*")
.is("total",null)

const pending = trades || []

for(const trade of pending){

const total = trade.price * trade.quantity

// update trade total
await supabase
.from("trades")
.update({ total })
.eq("id",trade.id)

// get current asset
const { data: asset } = await supabase
.from("catalog_assets")
.select("*")
.eq("catalog_id",trade.catalog_id)
.single()

const currentVolume = asset.volume || 0
const newVolume = currentVolume + trade.quantity
const newMarketCap = trade.price * 1000000

// update asset price + volume
await supabase
.from("catalog_assets")
.update({
price: trade.price,
volume: newVolume,
market_cap: newMarketCap
})
.eq("catalog_id",trade.catalog_id)

// record price history
await supabase
.from("price_history")
.insert({
catalog_id:trade.catalog_id,
price:trade.price,
volume:trade.quantity
})

}

return {
statusCode:200,
body:JSON.stringify({
engine:"trade-settlement",
trades_settled:pending.length
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
