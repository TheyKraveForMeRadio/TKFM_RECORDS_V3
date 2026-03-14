import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data:royalties } =
 await supabase
 .from("royalty_events")
 .select("*")

 let total = 0

 for(const r of royalties || []){
  total += r.amount || 0
 }

 return{
  statusCode:200,
  body:JSON.stringify({
   total_royalties:total
  })
 }

}
