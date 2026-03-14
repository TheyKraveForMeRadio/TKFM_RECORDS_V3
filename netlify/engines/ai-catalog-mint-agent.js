import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async()=>{

 const { data: artists } = await supabase
 .from("artists")
 .select("*");

 for(const a of artists){

  await supabase
  .from("catalogs")
  .insert({
   artist:a.name,
   title:"AI Generated Catalog",
   created_by:"AI",
   timestamp:new Date().toISOString()
  });

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"catalogs minted"
  })
 };

};
