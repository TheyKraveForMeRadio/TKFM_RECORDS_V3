import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data:creators } = await supabase.from("creators").select("*")
 const { data:catalogs } = await supabase.from("catalogs").select("*")
 const { data:transactions } = await supabase.from("wallet_transactions").select("*")

 const creatorCount = creators ? creators.length : 0
 const catalogCount = catalogs ? catalogs.length : 0

 let capitalFlow = 0

 if(transactions){
  transactions.forEach(t=>{
   capitalFlow += Number(t.amount || 0)
  })
 }

 return {
  statusCode:200,
  body:JSON.stringify({
   creators:creatorCount,
   catalogs:catalogCount,
   capital_flow:capitalFlow,
   timestamp:new Date().toISOString()
  })
 }
}
