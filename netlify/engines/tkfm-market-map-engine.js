import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

const { data: trades } = await supabase
.from("trades")
.select("*")

let heatmap=[]

for(const token of tokens || []){

let volume=0

for(const trade of trades || []){

if(trade.token_id===token.id){

volume+=Number(trade.price||0)*Number(trade.quantity||0)

}

}

const marketCap=
Number(token.price||0)*Number(token.total_supply||0)

heatmap.push({

id:token.id,
name:token.name,
price:Number(token.price||0),
supply:Number(token.total_supply||0),
market_cap:marketCap,
volume:volume

})

}

return{

statusCode:200,

body:JSON.stringify({

assets:heatmap

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
