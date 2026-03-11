import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const leads=[
"indie_artist",
"soundcloud_artist",
"tiktok_artist",
"youtube_creator"
]

for(const name of leads){

await supabase.from("artist_leads").insert({
name,
source:"recruitment_pipeline",
created_at:new Date().toISOString()
})

}

return{
statusCode:200,
body:JSON.stringify({leads_created:leads.length})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
