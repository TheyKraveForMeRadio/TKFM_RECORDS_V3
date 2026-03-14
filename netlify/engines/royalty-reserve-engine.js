import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data } = await supabase
  .from("catalog_revenue_totals")
  .select("*")

 let total_reserves = 0

 data.forEach(r => {
  total_reserves += r.total_revenue
 })

 return {
  statusCode: 200,
  body: JSON.stringify({
   total_reserves
  })
}
}
