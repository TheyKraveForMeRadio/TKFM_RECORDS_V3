import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { ipo_id, investor, shares } = body

 const { data } = await supabase
  .from("ipo_investments")
  .insert({
   ipo_id,
   investor,
   shares,
   created_at:new Date().toISOString()
  })

 return {
  statusCode:200,
  body:JSON.stringify({
   purchased:true,
   data
  })
 }
}
