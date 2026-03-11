import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
GLOBAL MUSIC INDEX

Calculates overall market performance
based on catalog market caps.
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

const indexValue = totalMarket / catalogs.length

await supabase.from("music_index_history").insert({
index_value:indexValue,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
index:indexValue,
market_cap:totalMarket
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
