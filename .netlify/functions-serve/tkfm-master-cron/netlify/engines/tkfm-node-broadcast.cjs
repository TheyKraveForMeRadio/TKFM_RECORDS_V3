
const fetch = require("node-fetch")

const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(event){

const body = JSON.parse(event.body || "{}")

const { data:nodes } =
await supabase
.from("tkfm_nodes")
.select("*")

for(const node of nodes){

try{

await fetch(node.endpoint+"/.netlify/functions/api/"+body.engine,{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify(body.payload || {})
})

}catch(err){

console.log("broadcast fail",node.endpoint)

}

}

return {
statusCode:200,
body:JSON.stringify({
status:"broadcast complete"
})
}

}

