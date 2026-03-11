import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
AI ARTIST MANAGER

Automatically:
discovers artists
onboards them
launches catalogs
starts IPOs
*/

async function recruitArtist(name){

const { data } = await supabase
.from("artists")
.insert({
name,
created_at:new Date().toISOString()
})
.select()
.single()

return data

}

async function launchCatalog(artist_id){

await supabase.from("catalogs").insert({
artist_id,
market_cap:10000,
created_at:new Date().toISOString()
})

}

export async function handler(){

try{

const artist = await recruitArtist(
"AI Artist " + Math.floor(Math.random()*100000)
)

await launchCatalog(artist.id)

return {
statusCode:200,
body:JSON.stringify({
status:"AI artist launched"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
