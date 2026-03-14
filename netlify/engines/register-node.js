import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

try{

const body = JSON.parse(event.body || "{}")

const { node_name, node_type, operator } = body

const { data } = await supabase
.from("tkfm_nodes")
.insert({

node_name,
node_type,
operator,
status:"active",
created_at:new Date()

})

return{

statusCode:200,
body:JSON.stringify({
success:true
})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
