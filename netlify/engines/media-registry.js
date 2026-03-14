import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const {title,type,creator} = body

 await supabase
 .from("media_registry")
 .insert({
  title,
  type,
  creator,
  created_at:new Date().toISOString()
 })

 return{
  statusCode:200,
  body:JSON.stringify({status:"media registered"})
 }

}
