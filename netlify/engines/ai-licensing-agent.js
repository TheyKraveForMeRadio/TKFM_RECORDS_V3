import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async()=>{

 const { data: catalogs } = await supabase
 .from("catalogs")
 .select("*");

 for(const c of catalogs){

  await supabase
  .from("music_licenses")
  .insert({
   catalog_id:c.id,
   licensee:"AI_AGENT",
   fee:100,
   timestamp:new Date().toISOString()
  });

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"licenses generated"
  })
 };

};
