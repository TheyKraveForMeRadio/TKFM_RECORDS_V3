import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

const VOLUME_SPIKE = 5
const PRICE_SPIKE = 2

export const handler = async () => {

try{

const { data: trades } = await supabase
.from("trades")
.select("*")
.order("created_at",{ascending:false})
.limit(200)

let alerts=[]

for(const trade of trades || []){

const price = Number(trade.price||0)
const qty = Number(trade.quantity||0)

if(price <=0 || qty <=0) continue

/* WASH TRADE CHECK */

if(trade.buyer_id === trade.seller_id){

alerts.push({
type:"wash_trade",
trade_id:trade.id
})

}

/* PRICE SPIKE CHECK */

if(price > PRICE_SPIKE * (trade.prev_price || price)){

alerts.push({
type:"price_spike",
trade_id:trade.id
})

}

/* VOLUME SPIKE */

if(qty > VOLUME_SPIKE * (trade.avg_quantity || qty)){

alerts.push({
type:"volume_spike",
trade_id:trade.id
})

}

}

/* STORE ALERTS */

for(const alert of alerts){

await supabase
.from("fraud_alerts")
.insert({
alert_type:alert.type,
reference_id:alert.trade_id
})

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
