import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/* GOVERNOR TARGETS */

const TARGET_MARKET_CAP = 1000000000
const TARGET_LIQUIDITY_RATIO = 0.25

export const handler = async () => {

try{

/* LOAD MARKET DATA */

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

const { data: pools } = await supabase
.from("liquidity_pools")
.select("*")

const { data: treasury } = await supabase
.from("treasury_reserves")
.select("*")

let marketCap = 0
let poolCapital = 0
let treasuryCapital = 0

for(const t of tokens || []){
marketCap +=
Number(t.price || 0) *
Number(t.total_supply || 0)
}

for(const p of pools || []){
poolCapital += Number(p.amount || 0)
}

for(const r of treasury || []){
treasuryCapital += Number(r.amount || 0)
}

/* LIQUIDITY RATIO */

const liquidityRatio =
marketCap > 0
? poolCapital / marketCap
: 0

let policyAction = "none"

/* GOVERNOR POLICY */

if(liquidityRatio < TARGET_LIQUIDITY_RATIO){

policyAction = "inject_liquidity"

await supabase
.from("liquidity_pools")
.insert({

amount:100000,
source:"ai_governor"

})

}

if(marketCap > TARGET_MARKET_CAP * 2){

policyAction = "tighten_policy"

await supabase
.from("treasury_reserves")
.insert({

amount:100000,
source:"ai_governor_reserve"

})

}

/* RECORD POLICY EVENT */

await supabase
.from("governor_policy_log")
.insert({

market_cap:marketCap,
liquidity_ratio:liquidityRatio,
policy_action:policyAction,
created_at:new Date()

})

return{

statusCode:200,

body:JSON.stringify({

market_cap:marketCap,
liquidity_ratio:liquidityRatio,
policy_action:policyAction

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
