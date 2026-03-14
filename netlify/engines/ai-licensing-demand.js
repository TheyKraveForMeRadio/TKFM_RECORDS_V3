import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data:catalogs } =
  await supabase
   .from("catalog_registry")
   .select("*")

 const demand=[]

 for(const catalog of catalogs || []){

  const score = Math.random()*100

  demand.push({
   catalog_id:catalog.catalog_id,
   licensing_demand_score:score
  })

 }

 return{
  statusCode:200,
  body:JSON.stringify(demand)
 }

}
