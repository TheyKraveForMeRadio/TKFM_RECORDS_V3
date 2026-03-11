import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
SETTLEMENT RELAY

Transfers value between network nodes.
*/

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

await supabase.from("network_settlements").insert({
from_node:body.from_node,
to_node:body.to_node,
amount:body.amount,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({status:"settlement complete"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
