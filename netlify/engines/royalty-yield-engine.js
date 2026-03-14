import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data: revenues } = await supabase
  .from("catalog_revenue_totals")
  .select("*")

 const { data: tokens } = await supabase
  .from("catalog_tokens")
  .select("*")

 let yields = []

 tokens.forEach(token => {

  const revenue = revenues.find(r => r.catalog_id === token.catalog_id)

  if(!revenue) return

  const apy = (revenue.total_revenue / token.total_shares) * 100

  yields.push({
   catalog_id:token.catalog_id,
   revenue:revenue.total_revenue,
   apy:apy
  })

 })

 return {
  statusCode:200,
  body:JSON.stringify({
   yields
  })
}
}
