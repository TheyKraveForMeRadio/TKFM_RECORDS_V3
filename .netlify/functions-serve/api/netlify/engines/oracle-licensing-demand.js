import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data:licenses } =
  await supabase
   .from("catalog_licenses")
   .select("*")

 const demand_score = (licenses || []).length * 10

 return{
  statusCode:200,
  body:JSON.stringify({
   licensing_demand_index:demand_score
  })
 }

}
