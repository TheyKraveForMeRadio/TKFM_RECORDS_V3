import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const body = JSON.parse(event.body)

const buyer = body.buyer
const seller = body.seller
const catalog_id = body.catalog_id
const price = body.price
const quantity = body.quantity

await supabase.from("catalog_trades").insert({
buyer,
seller,
catalog_id,
price,
quantity,
created_at:new Date().toISOString()
})

await supabase.rpc("transfer_catalog_shares",{
buyer,
seller,
catalog_id,
quantity
})

return {
statusCode:200,
body:JSON.stringify({success:true})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
