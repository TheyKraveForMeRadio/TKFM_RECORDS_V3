import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
GLOBAL MUSIC UNIVERSE SIMULATOR

Simulates the entire TKFM music economy.
*/

async function runSimulation(){

const { data:catalogs } = await supabase
.from("catalogs")
.select("market_cap")

let marketCap = 0

for(const c of catalogs){
marketCap += c.market_cap || 0
}

const growthFactor = 1 + (Math.random() * 0.1)
const projectedMarket = marketCap * growthFactor

return {
current_market:marketCap,
projected_market:projectedMarket
}

}

export async function handler(){

try{

const sim = await runSimulation()

await supabase.from("music_universe_simulations").insert({
current_market:sim.current_market,
projected_market:sim.projected_market,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify(sim)
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
