import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data: catalogs } = await supabase
 .from("catalogs")
 .select("*")

 for(const catalog of catalogs){

  await supabase
  .from("trades")
  .insert({
   catalog_id:catalog.id,
   buyer:"AI_MARKET_MAKER",
   amount:100,
   created_at:new Date().toISOString()
  })

 }

 return{
  statusCode:200,
  body:JSON.stringify({status:"market maker executed"})
 }

}
