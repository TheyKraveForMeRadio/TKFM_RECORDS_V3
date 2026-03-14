import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

const TARGET_LIQUIDITY = 1000000

export const handler = async () => {

try{

/* LOAD TREASURY */

const { data: treasury } = await supabase
.from("treasury_reserves")
.select("*")

let reserves = 0

for(const r of treasury || []){
reserves += Number(r.amount || 0)
}

/* LOAD MARKET CAP */

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

let marketCap = 0

for(const t of tokens || []){
marketCap +=
Number(t.price || 0) *
Number(t.total_supply || 0)
}

/* LIQUIDITY POLICY */

let action = "none"

if(marketCap < TARGET_LIQUIDITY){

action = "inject_liquidity"

await supabase
.from("liquidity_pools")
.insert({

amount:50000,
source:"central_bank"

})

}

if(marketCap > TARGET_LIQUIDITY * 2){

action = "withdraw_liquidity"

await supabase
.from("treasury_reserves")
.insert({

amount:50000,
source:"central_bank_withdrawal"

})

}

return{

statusCode:200,

body:JSON.stringify({

market_cap:marketCap,
reserves:reserves,
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
