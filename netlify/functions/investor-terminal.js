import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data:catalogs } = await supabase
  .from("catalogs")
  .select("*")

 const { data:investors } = await supabase
  .from("investor_balances")
  .select("*")

 const { data:royalties } = await supabase
  .from("royalty_payouts")
  .select("*")

 return {
  statusCode:200,
  body:JSON.stringify({
   catalogs,
   investors,
   royalties,
   timestamp:new Date().toISOString()
  })
}
}
