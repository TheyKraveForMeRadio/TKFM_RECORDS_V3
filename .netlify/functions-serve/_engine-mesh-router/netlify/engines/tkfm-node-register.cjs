
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(event){

try{

const body = JSON.parse(event.body || "{}")

const node = {
node_id: body.node_id,
region: body.region || "unknown",
endpoint: body.endpoint,
registered_at: new Date().toISOString()
}

await supabase
.from("tkfm_nodes")
.insert([node])

return {
statusCode:200,
body:JSON.stringify({
status:"node registered",
node
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}

