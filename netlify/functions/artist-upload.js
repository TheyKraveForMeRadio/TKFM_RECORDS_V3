import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(event){

 const body = JSON.parse(event.body);

 await supabase.from("catalogs").insert({

  artist:body.artist,
  title:body.title,
  monthly_revenue:body.monthly_revenue

 });

 return {

  statusCode:200,
  body:JSON.stringify({status:"catalog stored"})

 };

}
