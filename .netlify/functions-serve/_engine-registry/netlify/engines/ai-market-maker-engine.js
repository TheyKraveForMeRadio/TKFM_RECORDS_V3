/*
AI MARKET MAKER ENGINE
Creates automated trades for songs
*/

async function handler(event,context){

try{

const mod =
await import("@supabase/supabase-js")

const createClient =
mod.createClient

const supabase =
createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/* get market songs */

const { data:songs } =
await supabase
.from("catalog_market")
.select("*")
.limit(10)

if(!songs || songs.length===0){

return{
statusCode:200,
body:JSON.stringify({
status:"no songs available"
})
}

}

/* pick random song */

const song =
songs[Math.floor(Math.random()*songs.length)]

const basePrice =
Number(song.price || 1)

/* random movement */

const movement =
( Math.random() - 0.5 ) * 0.2

const newPrice =
Number((basePrice + movement).toFixed(2))

const quantity =
Math.floor(Math.random()*5)+1

/* record trade */

await supabase
.from("catalog_trades")
.insert({

catalog_id:song.catalog_id,
price:newPrice,
quantity:quantity,
created_at:new Date().toISOString()

})

/* update price */

const volume =
Number(song.volume || 0) + quantity

const marketCap =
newPrice * 1000000

await supabase
.from("catalog_market")
.update({

price:newPrice,
volume:volume,
market_cap:marketCap,
updated_at:new Date().toISOString()

})
.eq("catalog_id",song.catalog_id)

/* candle */

await supabase
.from("catalog_candles")
.insert({

catalog_id:song.catalog_id,
open:newPrice,
high:newPrice,
low:newPrice,
close:newPrice,
timestamp:new Date().toISOString()

})

return{

statusCode:200,
body:JSON.stringify({

status:"market maker trade",
catalog_id:song.catalog_id,
price:newPrice,
quantity:quantity

})

}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}

module.exports.handler = handler
module.exports.default = {handler}

