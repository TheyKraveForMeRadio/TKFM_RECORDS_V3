import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const influencers=[
"tiktok_artist",
"youtube_creator",
"instagram_artist"
]

for(const name of influencers){

await supabase.from("artists").insert({
name,
source:"influencer_launch",
created_at:new Date().toISOString()
})

}

return{
statusCode:200,
body:JSON.stringify({launched:influencers.length})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
