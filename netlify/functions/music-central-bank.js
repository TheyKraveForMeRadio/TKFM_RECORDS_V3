import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
MUSIC CENTRAL BANK

Controls liquidity for the TKFM economy.

Functions:
mint stablecoins
manage reserves
inject liquidity
*/

async function injectLiquidity(){

const { data:pools } = await supabase
.from("liquidity_pools")
.select("*")

if(!pools) return

for(const pool of pools){

const injection = pool.total_value * 0.02

await supabase
.from("liquidity_pools")
.update({
total_value: pool.total_value + injection
})
.eq("id",pool.id)

}

}

export async function handler(){

try{

await injectLiquidity()

return {
statusCode:200,
body:JSON.stringify({
status:"central bank liquidity injected"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
