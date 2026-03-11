import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const { data } = await supabase
 .from("catalogs")
 .select("*")
 .limit(100)

 return{
  statusCode:200,
  body:JSON.stringify({
   network:"TKFM_MUSIC_INTERNET",
   catalogs:data
  })
 }

}
