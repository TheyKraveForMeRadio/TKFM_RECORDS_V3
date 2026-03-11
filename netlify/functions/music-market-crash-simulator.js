import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
MARKET CRASH SIMULATOR

Tests resilience of the music economy.
*/

export async function handler(){

try{

const { data:catalogs } = await supabase
.from("catalogs")
.select("market_cap")

let total = 0

for(const c of catalogs){
total += c.market_cap || 0
}

const crashScenario = total * 0.6

await supabase.from("market_crash_simulations").insert({
market_before:total,
market_after:crashScenario,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
before:total,
after:crashScenario
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
