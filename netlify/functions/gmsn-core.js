import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
GLOBAL MUSIC SOVEREIGN NETWORK

Core network coordination layer
*/

export async function handler(){

try{

const { data:nodes } = await supabase
.from("sovereign_nodes")
.select("*")

return {
statusCode:200,
body:JSON.stringify({
network_nodes:nodes?.length || 0,
nodes
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
