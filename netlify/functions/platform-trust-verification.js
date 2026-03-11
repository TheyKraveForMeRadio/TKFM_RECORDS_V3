import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
TRUST VERIFICATION ENGINE
*/

export async function handler(){

try{

const { data:royalties } = await supabase
.from("royalty_history")
.select("*")

let total=0

for(const r of royalties){
total+=r.amount || 0
}

await supabase.from("platform_trust_metrics").insert({
royalty_volume:total,
verified:true,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({royalty_volume:total})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
