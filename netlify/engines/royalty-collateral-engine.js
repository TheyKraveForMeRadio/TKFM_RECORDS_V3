import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

 const body = JSON.parse(event.body)
 const { catalog_id } = body

 const { data } = await supabase
  .from("catalog_revenue_totals")
  .select("*")
  .eq("catalog_id", catalog_id)
  .single()

 const collateral_value = data.total_revenue * 5

 return {
  statusCode: 200,
  body: JSON.stringify({
   catalog_id,
   collateral_value
  })
}
}
