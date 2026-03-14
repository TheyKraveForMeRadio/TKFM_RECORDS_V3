import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { catalog_id, owner_wallet } = body

 const { data } = await supabase
  .from("catalog_ownership")
  .insert({
   catalog_id,
   owner_wallet,
   recorded_at:new Date().toISOString()
  })

 return {
  statusCode:200,
  body:JSON.stringify({
   ownership_recorded:true,
   data
  })
 }

}
