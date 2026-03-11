import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const body=JSON.parse(event.body||"{}")

await supabase.from("artist_referrals").insert({
referrer:body.referrer,
new_artist:body.artist,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
success:true
})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({
error:err.message
})
}

}

}
