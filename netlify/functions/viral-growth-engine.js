import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const body=JSON.parse(event.body||"{}")

await supabase.from("viral_shares").insert({
song_id:body.song_id,
platform:body.platform,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({status:"share tracked"})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
