import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 await supabase
 .from("referral_signups")
 .insert({
  referral_code:body.code,
  new_artist:body.artist,
  created_at:new Date().toISOString()
 })

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"referral_applied"
  })
 }

}
