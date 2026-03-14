import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const creator_id = event.queryStringParameters.creator_id

 const { data } = await supabase
  .from("creator_wallets")
  .select("*")
  .eq("creator_id",creator_id)

 return {
  statusCode:200,
  body:JSON.stringify({
   wallet:data
  })
 }
}
