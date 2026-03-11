import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
STABLECOIN TREASURY

Issues TKFM stablecoin for
royalties
trading settlement
loans
*/

async function mintStablecoin(amount, wallet){

await supabase.from("stablecoin_ledger").insert({
wallet,
amount,
created_at:new Date().toISOString()
})

}

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

await mintStablecoin(body.amount, body.wallet)

return {
statusCode:200,
body:JSON.stringify({status:"stablecoin minted"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
