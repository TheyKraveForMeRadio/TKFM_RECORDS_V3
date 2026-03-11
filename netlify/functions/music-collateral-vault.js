import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async(event)=>{

 const body = JSON.parse(event.body);

 const { catalog_id, collateral_value } = body;

 await supabase
 .from("music_collateral")
 .insert({
  catalog_id,
  collateral_value,
  timestamp:new Date().toISOString()
 });

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"collateral recorded"
  })
 };

};
