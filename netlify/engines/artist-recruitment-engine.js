import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { count } = await supabase
  .from("artists")
  .select("*",{ count:"exact", head:true })

 return {
  statusCode:200,
  body:JSON.stringify({
   milestone:"100 artists",
   current_artists:count || 0,
   progress: Math.min(((count||0)/100)*100,100)
  })
 }

}
