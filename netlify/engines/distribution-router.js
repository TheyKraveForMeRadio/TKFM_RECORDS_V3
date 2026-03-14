import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data:tracks } =
  await supabase
  .from("tracks")
  .select("*")
  .eq("status","uploaded")

 for(const track of tracks){

  await supabase
   .from("distribution_queue")
   .insert({
    track_id:track.id,
    platform:"spotify",
    status:"pending"
   })

  await supabase
   .from("distribution_queue")
   .insert({
    track_id:track.id,
    platform:"apple_music",
    status:"pending"
   })

  await supabase
   .from("distribution_queue")
   .insert({
    track_id:track.id,
    platform:"youtube",
    status:"pending"
   })

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   routed:true
  })
 }

}
