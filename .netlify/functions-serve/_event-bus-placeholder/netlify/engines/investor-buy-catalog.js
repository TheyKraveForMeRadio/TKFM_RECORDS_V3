import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { investor_id, catalog_id, amount } = body

 const { data } = await supabase
  .from("catalog_trades")
  .insert({
   investor_id,
   catalog_id,
   amount,
   created_at:new Date().toISOString()
  })

 return {
  statusCode:200,
  body:JSON.stringify({
   investment_complete:true,
   trade:data
  })
 }

}
