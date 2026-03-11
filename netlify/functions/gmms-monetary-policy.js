import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
GMMS MONETARY POLICY

Controls stablecoin supply and
monetary expansion of the music economy.
*/

export async function handler(){

try{

const { data:ledger } = await supabase
.from("stablecoin_ledger")
.select("amount")

let totalSupply = 0

for(const entry of ledger){
totalSupply += entry.amount
}

await supabase.from("gmms_metrics").insert({
stablecoin_supply:totalSupply,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({supply:totalSupply})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
