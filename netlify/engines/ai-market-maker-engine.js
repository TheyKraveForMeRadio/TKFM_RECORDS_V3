import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

const BUY_THRESHOLD = 0.85
const SELL_THRESHOLD = 1.15
const ORDER_SIZE = 10

export const handler = async () => {

try{

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

for(const token of tokens || []){

const price = Number(token.price || 1)
const fairValue = Number(token.fair_value || price)

const ratio = price / fairValue

/* BUY UNDERVALUED ASSETS */

if(ratio < BUY_THRESHOLD){

await supabase
.from("order_book")
.insert({
token_id:token.id,
side:"buy",
price:price,
quantity:ORDER_SIZE,
source:"ai_market_maker"
})

}

/* SELL OVERHEATED ASSETS */

if(ratio > SELL_THRESHOLD){

await supabase
.from("order_book")
.insert({
token_id:token.id,
side:"sell",
price:price,
quantity:ORDER_SIZE,
source:"ai_market_maker"
})

}

}

return{

statusCode:200,
body:JSON.stringify({
success:true,
message:"AI market maker executed"
})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
