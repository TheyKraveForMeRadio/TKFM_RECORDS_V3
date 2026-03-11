import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
CIVILIZATION GROWTH ENGINE

Measures growth of the entire ecosystem.
*/

export async function handler(){

try{

const { data:catalogs } = await supabase
.from("catalogs")
.select("market_cap")

let totalMarket = 0

for(const c of catalogs){
totalMarket += c.market_cap || 0
}

await supabase.from("civilization_growth").insert({
music_market_value:totalMarket,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
music_market_value:totalMarket
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
