import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* ------------------------------
LOAD TOKENS
------------------------------ */

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

/* ------------------------------
PROCESS EACH TOKEN
------------------------------ */

for(const token of tokens || []){

/* STREAMING REVENUE */

const { data: revenueEvents } = await supabase
.from("streaming_revenue_events")
.select("*")
.eq("track_id",token.id)

let revenueTotal=0

for(const event of revenueEvents || []){
revenueTotal+=Number(event.amount||0)
}

/* TRADE ACTIVITY */

const { data: trades } = await supabase
.from("trades")
.select("*")
.eq("token_id",token.id)

let tradeVolume=0

for(const trade of trades || []){
tradeVolume+=Number(trade.price||0)*Number(trade.quantity||0)
}

/* ------------------------------
PRICE CALCULATION
------------------------------ */

const basePrice = Number(token.price||1)

const revenueImpact = revenueTotal * 0.01
const tradeImpact = tradeVolume * 0.00001

let newPrice = basePrice + revenueImpact + tradeImpact

if(newPrice < 0.01) newPrice = 0.01

/* ------------------------------
UPDATE TOKEN PRICE
------------------------------ */

await supabase
.from("catalog_tokens")
.update({
price:newPrice
})
.eq("id",token.id)

}

/* ------------------------------
SUCCESS
------------------------------ */

return{

statusCode:200,

body:JSON.stringify({
success:true,
message:"prices updated"
})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
