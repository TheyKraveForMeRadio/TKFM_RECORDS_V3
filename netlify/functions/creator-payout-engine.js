import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { creator_id, amount } = body

 await supabase
  .from("creator_payouts")
  .insert({
   creator_id,
   amount,
   created_at:new Date().toISOString()
  })

 return{
  statusCode:200,
  body:JSON.stringify({
   payout_sent:amount
  })
}
}
