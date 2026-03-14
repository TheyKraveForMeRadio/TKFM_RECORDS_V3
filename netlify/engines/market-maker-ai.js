import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

const { data:catalogs } =
await supabase
.from("catalog_ipos")
.select("*")

const orders=[]

for(const catalog of catalogs||[]){

const basePrice = catalog.price || 10

const buyPrice = basePrice * 0.98
const sellPrice = basePrice * 1.02

orders.push({
 catalog:catalog.id,
 side:"buy",
 price:buyPrice,
 shares:100
})

orders.push({
 catalog:catalog.id,
 side:"sell",
 price:sellPrice,
 shares:100
})

}

return{
 statusCode:200,
 body:JSON.stringify({
 market_maker_orders:orders
 })
}

}
