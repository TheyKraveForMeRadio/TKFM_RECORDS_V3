import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data:catalogs } = await supabase
  .from("catalogs")
  .select("*")

 const count = catalogs ? catalogs.length : 0

 return {
  statusCode:200,
  body:JSON.stringify({
   metric:"catalog_market_size",
   total_catalogs:count,
   timestamp:new Date().toISOString()
  })
 }
}
