import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:index } = await supabase
.from("music_index_history")
.select("*")
.order("timestamp",{ascending:false})
.limit(1)

const { data:catalogs } = await supabase
.from("catalogs")
.select("id,name,market_cap")
.order("market_cap",{ascending:false})
.limit(10)

return {
statusCode:200,
body:JSON.stringify({
index:index?.[0],
top_catalogs:catalogs
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
