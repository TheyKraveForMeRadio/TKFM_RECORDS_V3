import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* MARKET DATA */

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

const { data: trades } = await supabase
.from("trades")
.select("*")

const { data: nodes } = await supabase
.from("tkfm_nodes")
.select("*")

const { data: alerts } = await supabase
.from("risk_alerts")
.select("*")

/* MARKET CAP */

let marketCap = 0

for(const t of tokens || []){

marketCap +=
Number(t.price || 0) *
Number(t.total_supply || 0)

}

/* TRADE VOLUME */

let tradeVolume = 0

for(const tr of trades || []){

tradeVolume +=
Number(tr.price || 0) *
Number(tr.quantity || 0)

}

/* NODE HEALTH */

let activeNodes = 0

for(const n of nodes || []){

if(n.status === "active"){
activeNodes++
}

}

/* RESPONSE */

return{

statusCode:200,

body:JSON.stringify({

market_cap:marketCap,
trade_volume:tradeVolume,
catalog_size:tokens?.length || 0,

network_nodes:nodes?.length || 0,
active_nodes:activeNodes,

risk_alerts:alerts?.length || 0

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
