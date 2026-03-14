import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data:creators } =
  await supabase.from("creators").select("*")

 const { data:catalogs } =
  await supabase.from("catalog_registry").select("*")

 const { data:royalties } =
  await supabase.from("royalty_events").select("*")

 const creators_count = creators?.length || 0
 const catalog_count = catalogs?.length || 0

 let royalty_volume = 0

 for(const r of royalties || []){
  royalty_volume += r.amount || 0
 }

 return{
  statusCode:200,
  body:JSON.stringify({
   creators:creators_count,
   catalogs:catalog_count,
   royalty_volume
  })
 }

}
