import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:artists } = await supabase
.from("artists")
.select("id")

for(const artist of artists){

await supabase.from("referral_campaigns").insert({
artist_id:artist.id,
reward:"5% trading fees",
created_at:new Date().toISOString()
})

}

return {
statusCode:200,
body:JSON.stringify({
campaigns_created:artists.length
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
