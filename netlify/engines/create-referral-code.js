import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

function generateCode(){
 return "TKFM-" + Math.random().toString(36).substring(2,8)
}

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const code = generateCode()

 await supabase
 .from("artist_referrals")
 .insert({
  artist:body.artist,
  code:code,
  created_at:new Date().toISOString()
 })

 return{
  statusCode:200,
  body:JSON.stringify({
   referral_code:code
  })
 }

}
