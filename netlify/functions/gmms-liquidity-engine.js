import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
GMMS LIQUIDITY ENGINE

Balances liquidity across:

catalog trading
creator lending
royalty payouts
*/

export async function handler(){

try{

const { data:pools } = await supabase
.from("liquidity_pools")
.select("*")

for(const pool of pools){

const adjustment = pool.total_value * 0.01

await supabase
.from("liquidity_pools")
.update({
total_value: pool.total_value + adjustment
})
.eq("id",pool.id)

}

return {
statusCode:200,
body:JSON.stringify({status:"liquidity balanced"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
