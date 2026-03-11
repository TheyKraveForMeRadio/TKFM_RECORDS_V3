import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { creator_id } = body

 const { data } = await supabase
  .from("creator_wallets")
  .insert({
   creator_id,
   balance:0,
   created_at:new Date().toISOString()
  })

 return {
  statusCode:200,
  body:JSON.stringify({
   wallet_created:true,
   wallet:data
  })
 }
}
