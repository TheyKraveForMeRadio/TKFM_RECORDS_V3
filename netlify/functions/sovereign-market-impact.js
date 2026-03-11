import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:catalogs } = await supabase
.from("catalogs")
.select("id,market_cap")

for(const catalog of catalogs){

const newValue = catalog.market_cap * 1.05

await supabase
.from("catalogs")
.update({market_cap:newValue})
.eq("id",catalog.id)

}

return {
statusCode:200,
body:JSON.stringify({status:"market updated"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
