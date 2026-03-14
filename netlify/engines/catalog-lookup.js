import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const { catalog_id } = event.queryStringParameters

 const { data } = await supabase
  .from("catalog_registry")
  .select("*")
  .eq("catalog_id",catalog_id)

 return{
  statusCode:200,
  body:JSON.stringify(data)
 }

}
