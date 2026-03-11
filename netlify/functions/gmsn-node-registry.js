import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
NODE REGISTRY

Registers sovereign music economy nodes.
*/

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const { data } = await supabase
.from("sovereign_nodes")
.insert({
node_name:body.node_name,
node_type:body.node_type,
region:body.region,
created_at:new Date().toISOString()
})
.select()
.single()

return {
statusCode:200,
body:JSON.stringify(data)
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
