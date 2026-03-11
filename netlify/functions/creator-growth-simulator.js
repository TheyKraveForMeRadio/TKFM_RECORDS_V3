import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
CREATOR GROWTH SIMULATOR

Predicts future creator adoption.
*/

export async function handler(){

try{

const { data:artists } = await supabase
.from("artists")
.select("id")

const current = artists?.length || 0
const projected = current * (1 + Math.random()*0.5)

await supabase.from("creator_growth_simulations").insert({
current_creators:current,
projected_creators:projected,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
current_creators:current,
projected_creators:projected
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
