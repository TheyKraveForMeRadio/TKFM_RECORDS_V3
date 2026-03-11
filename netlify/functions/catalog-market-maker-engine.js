import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const catalog_id = body.catalog_id
const price = body.price

const spread = price * 0.02

const buyPrice = price - spread
const sellPrice = price + spread

await supabase.from("catalog_orders").insert([
{
catalog_id,
side:"buy",
price:buyPrice,
quantity:100,
source:"market_maker"
},
{
catalog_id,
side:"sell",
price:sellPrice,
quantity:100,
source:"market_maker"
}
])

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
