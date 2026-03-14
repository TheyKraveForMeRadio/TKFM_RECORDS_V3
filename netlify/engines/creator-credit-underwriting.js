import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { creator_id } = body

 const { data } = await supabase
  .from("catalog_revenue_totals")
  .select("*")
  .eq("creator_id", creator_id)

 let total = 0

 data.forEach(d => total += d.total_revenue)

 const credit_limit = total * 3

 return{
  statusCode:200,
  body:JSON.stringify({
   creator_id,
   credit_limit
  })
}
}
