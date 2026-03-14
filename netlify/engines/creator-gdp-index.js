import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data } = await supabase
  .from("catalog_revenue_totals")
  .select("*")

 let gdp = 0

 data.forEach(d => gdp += d.total_revenue)

 return {
  statusCode: 200,
  body: JSON.stringify({
   creator_gdp:gdp
  })
}
}
