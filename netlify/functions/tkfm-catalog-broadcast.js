import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async(event)=>{

 const body = JSON.parse(event.body);

 const { catalog_id } = body;

 const { data } = await supabase
 .from("catalogs")
 .select("*")
 .eq("id",catalog_id)
 .single();

 return{
  statusCode:200,
  body:JSON.stringify({
   broadcast:"catalog",
   catalog:data
  })
 };

};
