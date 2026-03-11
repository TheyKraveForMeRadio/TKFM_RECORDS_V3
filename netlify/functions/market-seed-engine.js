import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:catalogs }=await supabase
.from("catalogs")
.select("id")
.limit(20)

for(const c of catalogs){

await supabase.from("catalog_orders").insert({
catalog_id:c.id,
side:"buy",
price:100,
quantity:10,
source:"market_seed"
})

}

return{
statusCode:200,
body:JSON.stringify({status:"market seeded"})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
