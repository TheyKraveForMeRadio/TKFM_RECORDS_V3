import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body || "{}")

 const { app_name, developer } = body

 await supabase
  .from("creator_protocol_apps")
  .insert({
   app_name,
   developer,
   created_at:new Date().toISOString()
  })

 return{
  statusCode:200,
  body:JSON.stringify({
   registered:true
  })
}
}
