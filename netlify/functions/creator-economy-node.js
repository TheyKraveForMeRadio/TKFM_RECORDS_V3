import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
CREATOR ECONOMY NODE

Creates sovereign creator economies.
*/

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const { data } = await supabase
.from("creator_internet_nodes")
.insert({
creator_id:body.creator_id,
node_name:body.node_name,
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
