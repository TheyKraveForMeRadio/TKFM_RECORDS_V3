import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const { artist } = event.queryStringParameters

 const { data } = await supabase
  .from("catalog_registry")
  .select("*")
  .ilike("artist","%"+artist+"%")

 return{
  statusCode:200,
  body:JSON.stringify(data)
 }

}
