import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

const { data:buyOrders } =
await supabase
.from("catalog_buy_orders")
.select("*")

const { data:sellOrders } =
await supabase
.from("catalog_sell_orders")
.select("*")

const trades=[]

for(const buy of buyOrders||[]){
for(const sell of sellOrders||[]){

if(
buy.catalog===sell.catalog &&
buy.price>=sell.price
){

trades.push({
catalog:buy.catalog,
buyer:buy.buyer,
seller:sell.seller,
price:sell.price,
shares:Math.min(buy.shares,sell.shares)
})

}

}
}

return{
statusCode:200,
body:JSON.stringify(trades)
}

}
