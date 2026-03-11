import { createClient } from "@supabase/supabase-js";

const supabase =
 createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
 );

export async function handler(event){

 const id =
 new URLSearchParams(
  event.queryStringParameters
 ).get("artist_id");

 const { data } =
 await supabase
 .from("catalogs")
 .select("*")
 .eq("artist_id", id);

 return {

  statusCode:200,
  body:JSON.stringify(data)

 };

}
