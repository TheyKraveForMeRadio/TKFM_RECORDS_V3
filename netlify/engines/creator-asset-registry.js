import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { title, creator, asset_type } = body

 await supabase
  .from("creator_assets")
  .insert({
   title,
   creator,
   asset_type,
   created_at:new Date().toISOString()
  })

 return{
  statusCode:200,
  body:JSON.stringify({status:"asset listed"})
 }

}
