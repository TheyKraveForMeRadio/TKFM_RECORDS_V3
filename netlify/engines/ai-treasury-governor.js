import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data } = await supabase
 .from("catalog_revenue_totals")
 .select("*")
 .order("total_revenue",{ascending:false})
 .limit(10)

 for(const c of data){

  await supabase
  .from("ai_treasury_allocations")
  .insert({
   catalog_id:c.catalog_id,
   investment:5000,
   created_at:new Date().toISOString()
  })

 }

 return{
  statusCode:200,
  body:JSON.stringify({status:"treasury allocation executed"})
 }

}
