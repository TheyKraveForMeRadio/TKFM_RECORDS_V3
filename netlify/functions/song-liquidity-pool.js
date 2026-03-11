import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const body=JSON.parse(event.body||"{}")

await supabase.from("song_liquidity_pools").insert({
catalog_id:body.catalog_id,
amount:body.amount,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({status:"liquidity added"})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
