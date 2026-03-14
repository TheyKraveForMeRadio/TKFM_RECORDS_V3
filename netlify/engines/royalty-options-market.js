import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data } =
 await supabase
 .from("catalogs")
 .select("*")

 const options = []

 for(const c of data || []){

  options.push({
   catalog:c.title,
   strike_price:(c.royalty_yield || 1)*10,
   premium:(c.royalty_yield || 1)*2
  })

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   options
  })
 }

}
