import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* LOAD UNSETTLED TRADES */

const { data: trades } = await supabase
.from("trades")
.select("*")
.eq("settled",false)

for(const trade of trades || []){

const token_id = trade.token_id
const buyer = trade.buyer_id
const seller = trade.seller_id
const qty = Number(trade.quantity || 0)
const price = Number(trade.price || 0)

const value = qty * price

/* UPDATE BUYER HOLDINGS */

await supabase
.from("token_holders")
.upsert({

user_id:buyer,
token_id:token_id,
quantity:qty

})

/* UPDATE SELLER HOLDINGS */

await supabase
.rpc("decrement_holder_shares",{

p_user:seller,
p_token:token_id,
p_qty:qty

})

/* LEDGER ENTRY BUYER */

await supabase
.schema("finance")
.from("platform_ledger")
.insert({

entity_type:"investor",
entity_id:buyer,
transaction_type:"share_purchase",
amount:-value,
reference:trade.id

})

/* LEDGER ENTRY SELLER */

await supabase
.schema("finance")
.from("platform_ledger")
.insert({

entity_type:"investor",
entity_id:seller,
transaction_type:"share_sale",
amount:value,
reference:trade.id

})

/* MARK TRADE SETTLED */

await supabase
.from("trades")
.update({settled:true})
.eq("id",trade.id)

}

return{

statusCode:200,
body:JSON.stringify({

settled_trades:trades?.length || 0

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
