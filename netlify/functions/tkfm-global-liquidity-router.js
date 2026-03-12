import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* LOAD INVESTOR WALLETS */

const { data: wallets } = await supabase
.from("investor_wallets")
.select("*")

/* LOAD TREASURY */

const { data: treasury } = await supabase
.from("treasury_reserves")
.select("*")

/* LOAD LIQUIDITY POOLS */

const { data: pools } = await supabase
.from("liquidity_pools")
.select("*")

let totalInvestorCapital = 0
let treasuryCapital = 0
let poolCapital = 0

for(const w of wallets || []){
totalInvestorCapital += Number(w.balance || 0)
}

for(const t of treasury || []){
treasuryCapital += Number(t.amount || 0)
}

for(const p of pools || []){
poolCapital += Number(p.amount || 0)
}

/* GLOBAL LIQUIDITY */

const totalLiquidity =
totalInvestorCapital +
treasuryCapital +
poolCapital

/* ROUTING POLICY */

let action = "stable"

if(poolCapital < totalLiquidity * 0.2){

action = "inject_liquidity"

await supabase
.from("liquidity_pools")
.insert({

amount:50000,
source:"liquidity_router"

})

}

if(poolCapital > totalLiquidity * 0.5){

action = "withdraw_liquidity"

await supabase
.from("treasury_reserves")
.insert({

amount:50000,
source:"liquidity_router"

})

}

return{

statusCode:200,

body:JSON.stringify({

investor_capital:totalInvestorCapital,
treasury_capital:treasuryCapital,
pool_capital:poolCapital,
total_liquidity:totalLiquidity,
policy_action:action

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
