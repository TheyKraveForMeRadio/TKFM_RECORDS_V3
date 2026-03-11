import { createClient } from "@supabase/supabase-js";

const supabase =
 createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
 );

export async function handler(event){

 const track =
 new URLSearchParams(
  event.queryStringParameters
 ).get("track");

 const { data } =
 await supabase
 .from("streaming_revenue")
 .select("*")
 .eq("track", track);

 return {
  statusCode:200,
  body:JSON.stringify(data)
 };

}
