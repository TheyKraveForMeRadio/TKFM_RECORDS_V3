const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

function randomPrice(){
return Number((Math.random()*8+1).toFixed(2))
}

function randomStreams(){
return Math.floor(Math.random()*1000000)
}

exports.handler = async ()=>{

try{

let assets = []

for(let i=1;i<=100;i++){

const catalog_id = "song"+i
const price = randomPrice()
const market_cap = price*1000000
const volume = Math.floor(Math.random()*5000)

assets.push({
catalog_id,
title:"TKFM Song "+i,
artist:"Artist "+i,
price,
market_cap,
volume,
shares_total:1000000,
shares_available:1000000
})

}

await supabase.from("catalog_assets").insert(assets)

let liquidity = assets.map(a=>({
catalog_id:a.catalog_id,
liquidity:a.market_cap*0.02
}))

await supabase.from("liquidity_pools").insert(liquidity)

let priceHistory = assets.map(a=>({
catalog_id:a.catalog_id,
price:a.price,
volume:a.volume
}))

await supabase.from("price_history").insert(priceHistory)

let streaming = assets.map(a=>{

const spotify=randomStreams()
const apple=Math.floor(spotify*0.2)
const youtube=Math.floor(spotify*0.5)

return {
catalog_id:a.catalog_id,
spotify_streams:spotify,
apple_streams:apple,
youtube_views:youtube,
revenue:spotify*0.003
}

})

await supabase.from("streaming_revenue").insert(streaming)

return {
statusCode:200,
body:JSON.stringify({
status:"market seeded",
assets_created:assets.length
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
