import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

await supabase.from("fan_army").insert({
joined:true,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({success:true})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
