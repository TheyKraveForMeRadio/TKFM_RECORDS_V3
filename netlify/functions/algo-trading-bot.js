import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
ALGORITHMIC TRADING BOT

Trades catalogs based on price signals.
*/

async function trade(){

const { data:prices } = await supabase
.from("catalog_price_history")
.select("*")
.order("timestamp",{ascending:false})
.limit(50)

if(!prices) return

for(const p of prices){

if(p.price_change > 5){

await supabase.from("catalog_orders").insert({
catalog_id:p.catalog_id,
side:"buy",
price:p.price,
quantity:50,
source:"algo_trader"
})

}

if(p.price_change < -5){

await supabase.from("catalog_orders").insert({
catalog_id:p.catalog_id,
side:"sell",
price:p.price,
quantity:50,
source:"algo_trader"
})

}

}

}

export async function handler(){

try{

await trade()

return {
statusCode:200,
body:JSON.stringify({status:"algo trades executed"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
