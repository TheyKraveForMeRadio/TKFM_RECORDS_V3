import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const body = JSON.parse(event.body)

await supabase
.from("catalog_trades")
.insert({
catalog:body.catalog,
price:body.price,
shares:body.shares,
buyer:body.buyer,
seller:body.seller,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
status:"price_recorded"
})
}

}
