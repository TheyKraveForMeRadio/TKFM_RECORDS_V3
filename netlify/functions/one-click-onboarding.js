import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const { data:artist } = await supabase
.from("artists")
.insert({
name:body.artist,
created_at:new Date().toISOString()
})
.select()
.single()

const { data:catalog } = await supabase
.from("catalogs")
.insert({
artist_id:artist.id,
title:body.song,
market_cap:10000,
created_at:new Date().toISOString()
})
.select()
.single()

await supabase.from("catalog_ipos").insert({
catalog_id:catalog.id,
valuation:10000,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
artist,
catalog
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
