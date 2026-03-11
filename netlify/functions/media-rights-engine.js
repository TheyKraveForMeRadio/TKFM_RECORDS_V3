import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const {media_id,owner,share} = body

 await supabase
 .from("media_rights")
 .insert({
  media_id,
  owner,
  share
 })

 return{
  statusCode:200,
  body:JSON.stringify({status:"rights recorded"})
 }

}
