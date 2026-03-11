import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
GLOBAL MUSIC CIVILIZATION ENGINE

Coordinates all systems in the TKFM ecosystem.
*/

async function getSystemStatus(){

const { data:catalogs } = await supabase
.from("catalogs")
.select("id")

const { data:artists } = await supabase
.from("artists")
.select("id")

const { data:nodes } = await supabase
.from("creator_internet_nodes")
.select("id")

return {
catalogs: catalogs?.length || 0,
artists: artists?.length || 0,
creator_nodes: nodes?.length || 0
}

}

export async function handler(){

try{

const status = await getSystemStatus()

await supabase.from("civilization_metrics").insert({
catalog_count:status.catalogs,
artist_count:status.artists,
node_count:status.creator_nodes,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
civilization_status:status
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
