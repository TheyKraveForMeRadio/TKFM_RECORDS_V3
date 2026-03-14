import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* LOAD REGISTERED NODES */

const { data: nodes } = await supabase
.from("tkfm_nodes")
.select("*")

/* NETWORK HEALTH */

let activeNodes = 0
let totalNodes = nodes?.length || 0

for(const node of nodes || []){

if(node.status === "active"){
activeNodes++
}

}

/* NETWORK METRICS */

const health =
totalNodes > 0
? (activeNodes / totalNodes) * 100
: 0

/* UPDATE NODE HEARTBEAT */

for(const node of nodes || []){

await supabase
.from("tkfm_nodes")
.update({
last_seen:new Date()
})
.eq("id",node.id)

}

/* NETWORK STATUS */

return{

statusCode:200,

body:JSON.stringify({

network_nodes:totalNodes,
active_nodes:activeNodes,
network_health:health

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
