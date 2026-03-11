import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(event){

 const id = event.queryStringParameters.id;

 const { data } = await supabase
 .from("catalogs")
 .select("*")
 .eq("id",id)
 .single();

 return {

  statusCode:200,
  body:JSON.stringify(data)

 };

}
