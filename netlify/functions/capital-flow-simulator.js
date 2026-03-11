import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
CAPITAL FLOW SIMULATOR

Models institutional investment inflows.
*/

export async function handler(){

try{

const { data:positions } = await supabase
.from("hedge_fund_positions")
.select("capital_allocated")

let capital = 0

for(const p of positions){
capital += p.capital_allocated || 0
}

const projectedCapital = capital * (1 + Math.random()*0.3)

await supabase.from("capital_flow_simulations").insert({
current_capital:capital,
projected_capital:projectedCapital,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
current_capital:capital,
projected_capital:projectedCapital
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
