import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
MUSIC DERIVATIVES CLEARING CORPORATION (MDCC)

Clears and settles:

royalty futures
catalog options
music swaps

Acts as the counterparty to every derivatives trade.
*/

async function settleContracts(){

const { data:contracts } = await supabase
.from("music_derivatives_contracts")
.select("*")
.eq("settled",false)

if(!contracts) return

for(const contract of contracts){

const payout = contract.contract_value * contract.settlement_price

await supabase.from("derivatives_settlements").insert({
contract_id:contract.id,
buyer:contract.buyer,
seller:contract.seller,
payout,
created_at:new Date().toISOString()
})

await supabase
.from("music_derivatives_contracts")
.update({settled:true})
.eq("id",contract.id)

}

}

export async function handler(){

try{

await settleContracts()

return {
statusCode:200,
body:JSON.stringify({
status:"derivatives cleared"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
