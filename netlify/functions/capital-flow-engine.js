import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data:transactions } = await supabase
  .from("wallet_transactions")
  .select("amount")

 let total = 0

 if(transactions){
  transactions.forEach(t=>{
   total += Number(t.amount || 0)
  })
 }

 return {
  statusCode:200,
  body:JSON.stringify({
   metric:"capital_flow",
   total_volume:total,
   timestamp:new Date().toISOString()
  })
 }
}
