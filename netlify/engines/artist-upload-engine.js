import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event) => {

 const body = JSON.parse(event.body)

 const { artist_name, track_title, cover_url } = body

 const { data, error } = await supabase
  .from("catalogs")
  .insert({
   artist_name,
   track_title,
   cover_url,
   created_at:new Date().toISOString()
  })

 return {
  statusCode:200,
  body:JSON.stringify({
   uploaded:true,
   data
  })
}
}
