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

 const predicted_yield = total * 1.2

 return{
  statusCode:200,
  body:JSON.stringify({
   predicted_investor_yield:predicted_yield
  })
 }

}
