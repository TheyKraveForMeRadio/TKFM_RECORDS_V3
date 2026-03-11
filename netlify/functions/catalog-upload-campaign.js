import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:catalogs } = await supabase
.from("catalogs")
.select("id")

const count = catalogs?.length || 0
const target = 500

await supabase.from("activation_progress").insert({
metric:"catalog_uploads",
current_value:count,
target_value:target,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
catalogs_uploaded:count,
target
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
