import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

 const body = JSON.parse(event.body)

 const {
  artist,
  catalog_name,
  valuation,
  total_shares
 } = body

 const price_per_share = valuation / total_shares

 const { data, error } = await supabase
  .from("catalog_ipos")
  .insert({
   artist,
   catalog_name,
   valuation,
   total_shares,
   price_per_share,
   created_at:new Date().toISOString()
  })

 return {
  statusCode:200,
  body:JSON.stringify({
   ipo_created:true,
   price_per_share,
   data
  })
 }
}
