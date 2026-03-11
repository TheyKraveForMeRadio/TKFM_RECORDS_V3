import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:catalogs } = await supabase
.from("catalogs")
.select("*")
.eq("ipo_launched",false)
.limit(10)

for(const catalog of catalogs){

await supabase.from("catalog_ipos").insert({
catalog_id:catalog.id,
valuation:catalog.market_cap || 10000,
created_at:new Date().toISOString()
})

await supabase
.from("catalogs")
.update({ipo_launched:true})
.eq("id",catalog.id)

}

return {
statusCode:200,
body:JSON.stringify({
ipos_launched:catalogs.length
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
