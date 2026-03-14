import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const body = JSON.parse(event.body)

await supabase
.from("market_maker_orders")
.insert(body.orders)

return{
 statusCode:200,
 body:JSON.stringify({
 status:"orders_created"
 })
}

}
