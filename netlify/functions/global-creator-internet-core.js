import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
GLOBAL CREATOR INTERNET CORE

Coordinates creator-owned economic networks.
*/

export async function handler(){

try{

const { data:nodes } = await supabase
.from("creator_internet_nodes")
.select("*")

return {
statusCode:200,
body:JSON.stringify({
creator_nodes:nodes?.length || 0,
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
