import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const body = JSON.parse(event.body)

await supabase
.from("catalog_buy_orders")
.insert({
buyer:body.buyer,
catalog:body.catalog,
shares:body.shares,
price:body.price,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
status:"buy_order_created"
})
}

}
