import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* LOAD TOKENS */

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

/* LOAD TRADES */

const { data: trades } = await supabase
.from("trades")
.select("*")

let marketCap = 0
let volume = 0
let avgPrice = 0

for(const t of tokens || []){

const price = Number(t.price || 0)
const supply = Number(t.total_supply || 0)

marketCap += price * supply
avgPrice += price

}

if(tokens?.length){
avgPrice = avgPrice / tokens.length
}

/* TRADE VOLUME */

for(const tr of trades || []){

volume +=
Number(tr.price || 0) *
Number(tr.quantity || 0)

}

/* INDEX VALUE */

const indexValue = marketCap / 1000000

return{

statusCode:200,

body:JSON.stringify({

index_name:"TKFM Global Music Index",
symbol:"TKX",

market_cap:marketCap,
trade_volume:volume,
average_price:avgPrice,

index_value:indexValue,
catalog_size:tokens?.length || 0

})

}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
