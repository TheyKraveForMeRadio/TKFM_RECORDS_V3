import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
ALGORITHMIC MARKET MAKER

Creates buy/sell orders automatically
to maintain liquidity.
*/

async function createOrders(){

const { data:catalogs } = await supabase
.from("catalogs")
.select("id,market_cap")

if(!catalogs) return

for(const catalog of catalogs){

const price = catalog.market_cap / 100000

await supabase.from("catalog_orders").insert([
{
catalog_id:catalog.id,
side:"buy",
price:price*0.98,
quantity:100,
source:"algo_market_maker"
},
{
catalog_id:catalog.id,
side:"sell",
price:price*1.02,
quantity:100,
source:"algo_market_maker"
}
])

}

}

export async function handler(){

try{

await createOrders()

return {
statusCode:200,
body:JSON.stringify({status:"liquidity injected"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
