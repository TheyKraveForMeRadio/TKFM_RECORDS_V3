
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(){

const { data } =
await supabase
.from("tkfm_nodes")
.select("*")

return {
statusCode:200,
body:JSON.stringify({
nodes:data
})
}

}

