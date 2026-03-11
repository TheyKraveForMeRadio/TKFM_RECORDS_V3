import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
MUSIC INVESTMENT BANK

Responsible for:
catalog acquisitions
capital raises
institutional financing
large catalog deals
*/

async function registerDeal(body){

const { data } = await supabase
.from("catalog_deals")
.insert({
catalog_id:body.catalog_id,
buyer:body.buyer,
deal_size:body.deal_size,
deal_type:body.deal_type,
status:"pending",
created_at:new Date().toISOString()
})
.select()
.single()

return data
}

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const deal = await registerDeal(body)

return {
statusCode:200,
body:JSON.stringify({
status:"deal registered",
deal
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
