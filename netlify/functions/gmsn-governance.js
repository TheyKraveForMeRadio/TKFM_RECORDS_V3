import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
NETWORK GOVERNANCE

Allows sovereign nodes to vote on
protocol changes.
*/

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

await supabase.from("network_votes").insert({
node:body.node,
proposal:body.proposal,
vote:body.vote,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({status:"vote recorded"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
