import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:catalogs } = await supabase
.from("catalogs")
.select("id,name,market_cap")
.order("market_cap",{ascending:false})
.limit(100)

let total = 0

catalogs.forEach(c=>{
total += c.market_cap || 0
})

const indexValue = total / catalogs.length

await supabase
.from("music_index_history")
.insert({
value:indexValue,
timestamp:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
index:indexValue,
catalog_count:catalogs.length
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
