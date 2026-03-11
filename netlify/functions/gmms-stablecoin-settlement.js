import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
GMMS STABLECOIN SETTLEMENT

Handles settlement between:

royalty payouts
catalog trades
credit market
*/

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

await supabase.from("stablecoin_settlements").insert({
from_wallet:body.from_wallet,
to_wallet:body.to_wallet,
amount:body.amount,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({status:"settlement complete"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
