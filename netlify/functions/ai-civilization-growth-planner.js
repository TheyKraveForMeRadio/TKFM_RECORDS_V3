import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
AI GROWTH PLANNER

Plans expansion of the creator economy.
*/

export async function handler(){

try{

const { data:artists } = await supabase.from("artists").select("id")

const growthTarget = (artists?.length || 0) * 1.2

await supabase.from("ai_growth_targets").insert({
target_artists:growthTarget,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({target_artists:growthTarget})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
