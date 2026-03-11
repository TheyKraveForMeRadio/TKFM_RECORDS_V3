import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
ARTIST ACQUISITION ENGINE
*/

export async function handler(){

try{

const { data } = await supabase
.from("artist_leads")
.select("*")
.eq("status","new")
.limit(20)

for(const lead of data){

await supabase.from("artists").insert({
name:lead.name,
source:"acquisition_engine",
created_at:new Date().toISOString()
})

await supabase
.from("artist_leads")
.update({status:"converted"})
.eq("id",lead.id)

}

return {
statusCode:200,
body:JSON.stringify({artists_onboarded:data.length})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
