import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data:payouts } =
  await supabase
   .from("royalty_payouts")
   .select("*")

 let total = 0

 for(const p of payouts || []){
  total += p.amount
 }

 const yield_rate = total * 0.05

 return{
  statusCode:200,
  body:JSON.stringify({
   royalty_yield_index:yield_rate
  })
 }

}
