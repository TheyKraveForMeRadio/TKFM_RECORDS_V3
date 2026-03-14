import bus from "./_event-bus.js";
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

 return{
  statusCode:200,
  body:JSON.stringify({
   catalogs
  })
 }

}
