import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const {node_url,node_type} = body

 await supabase
 .from("tkfm_nodes")
 .insert({
  node_url,
  node_type,
  created_at:new Date().toISOString()
 })

 return{
  statusCode:200,
  body:JSON.stringify({status:"node registered"})
 }

}
