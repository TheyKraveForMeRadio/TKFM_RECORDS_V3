import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const catalog = event.queryStringParameters.catalog

const { data:buyOrders } =
await supabase
.from("catalog_buy_orders")
.select("*")
.eq("catalog",catalog)

const { data:sellOrders } =
await supabase
.from("catalog_sell_orders")
.select("*")
.eq("catalog",catalog)

return{
 statusCode:200,
 body:JSON.stringify({
 buy_orders:buyOrders||[],
 sell_orders:sellOrders||[]
 })
}

}
