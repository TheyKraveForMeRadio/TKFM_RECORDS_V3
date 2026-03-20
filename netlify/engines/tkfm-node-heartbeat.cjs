
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(event){

const body = JSON.parse(event.body || "{}")

await supabase
.from("tkfm_nodes")
.update({
last_seen:new Date().toISOString()
})
.eq("node_id",body.node_id)

return {
statusCode:200,
body:JSON.stringify({
status:"heartbeat received"
})
}

}

