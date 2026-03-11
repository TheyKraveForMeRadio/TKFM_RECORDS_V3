import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
AI ECONOMIC POLICY ENGINE

Adjusts monetary and liquidity policy automatically.
*/

export async function handler(){

try{

const { data:metrics } = await supabase
.from("gmms_metrics")
.select("*")
.order("created_at",{ascending:false})
.limit(1)

const supply = metrics?.[0]?.stablecoin_supply || 0

let policy = "neutral"

if(supply > 100000000){
policy = "tighten_liquidity"
}

if(supply < 10000000){
policy = "expand_liquidity"
}

await supabase.from("ai_policy_decisions").insert({
policy,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({policy})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
