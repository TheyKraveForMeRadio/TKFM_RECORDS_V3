import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data:creators } = await supabase
  .from("creators")
  .select("*")

 const count = creators ? creators.length : 0

 return {
  statusCode:200,
  body:JSON.stringify({
   metric:"creator_growth",
   total_creators:count,
   timestamp:new Date().toISOString()
  })
 }
}
