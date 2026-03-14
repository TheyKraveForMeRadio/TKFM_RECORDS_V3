import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/* RISK LIMITS */

const MAX_POSITION_VALUE = 500000
const MAX_ORDER_SIZE = 100000

export const handler = async () => {

try{

/* LOAD HOLDERS */

const { data: holders } = await supabase
.from("token_holders")
.select("*")

let alerts = []

for(const holder of holders || []){

const user = holder.user_id
const token = holder.token_id
const qty = Number(holder.quantity || 0)

/* LOAD TOKEN PRICE */

const { data: tokenData } = await supabase
.from("catalog_tokens")
.select("*")
.eq("id",token)
.single()

const price = Number(tokenData?.price || 0)

const positionValue = qty * price

/* POSITION LIMIT CHECK */

if(positionValue > MAX_POSITION_VALUE){

alerts.push({
user_id:user,
token_id:token,
type:"position_limit"
})

}

}

/* LOAD OPEN ORDERS */

const { data: orders } = await supabase
.from("order_book")
.select("*")

for(const order of orders || []){

const orderValue =
Number(order.price || 0) *
Number(order.quantity || 0)

if(orderValue > MAX_ORDER_SIZE){

alerts.push({
user_id:order.user_id,
token_id:order.token_id,
type:"oversized_order"
})

}

}

/* STORE RISK ALERTS */

for(const a of alerts){

await supabase
.from("risk_alerts")
.insert({

user_id:a.user_id,
token_id:a.token_id,
alert_type:a.type,
created_at:new Date()

})

}

/* AUTO LIQUIDATION (optional safety) */

for(const a of alerts){

if(a.type === "position_limit"){

await supabase
.from("order_book")
.insert({

token_id:a.token_id,
side:"sell",
price:0,
quantity:100,
source:"risk_engine_liquidation"

})

}

}

return{

statusCode:200,

body:JSON.stringify({

alerts_detected:alerts.length

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
