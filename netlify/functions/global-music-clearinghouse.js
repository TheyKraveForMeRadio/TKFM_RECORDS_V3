import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
GLOBAL MUSIC CLEARINGHOUSE

Responsible for settling:

catalog trades
royalty payouts
licensing payments
derivatives contracts

Functions like the clearing system used by
financial markets.
*/

async function settleTrades(){

const { data:trades } = await supabase
.from("catalog_trades")
.select("*")
.eq("settled",false)
.limit(100)

if(!trades) return

for(const trade of trades){

await supabase.rpc("transfer_catalog_shares",{
buyer:trade.buyer,
seller:trade.seller,
catalog_id:trade.catalog_id,
quantity:trade.quantity
})

await supabase
.from("catalog_trades")
.update({settled:true})
.eq("id",trade.id)

}

}

async function settleRoyalties(){

const { data:royalties } = await supabase
.from("royalty_payout_queue")
.select("*")
.eq("paid",false)
.limit(100)

if(!royalties) return

for(const r of royalties){

await supabase.rpc("credit_creator_wallet",{
creator_id:r.creator_id,
amount:r.amount
})

await supabase
.from("royalty_payout_queue")
.update({paid:true})
.eq("id",r.id)

}

}

export async function handler(){

try{

await settleTrades()
await settleRoyalties()

return {
statusCode:200,
body:JSON.stringify({
status:"clearing complete"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
