import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(event){

 const body = JSON.parse(event.body);

 await supabase
 .from("catalogs")
 .insert({

  artist_id:body.artist,
  catalog_title:body.title,
  verified:false

 });

 return {
  statusCode:200,
  body:JSON.stringify({catalog_submitted:true})
 };

}
