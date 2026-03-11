import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
LIQUIDITY STABILIZER
*/

export async function handler(){

try{

const { data:catalogs } = await supabase
.from("catalogs")
.select("id")

for(const catalog of catalogs){

await supabase.from("catalog_orders").insert([
{
catalog_id:catalog.id,
side:"buy",
price:90,
quantity:5,
source:"liquidity_stabilizer"
},
{
catalog_id:catalog.id,
side:"sell",
price:110,
quantity:5,
source:"liquidity_stabilizer"
}
])

}

return{
statusCode:200,
body:JSON.stringify({status:"liquidity injected"})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
