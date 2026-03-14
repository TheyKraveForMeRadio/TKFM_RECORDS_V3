import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data:catalogs } =
 await supabase
 .from("catalogs")
 .select("*")

 const derivatives = []

 for(const c of catalogs || []){

  derivatives.push({
   catalog:c.title,
   artist:c.artist,
   futures_price:(c.royalty_yield || 1)*12,
   option_price:(c.royalty_yield || 1)*3
  })

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   derivatives
  })
 }

}
