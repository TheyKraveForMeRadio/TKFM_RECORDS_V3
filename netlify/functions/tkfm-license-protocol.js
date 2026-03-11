import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async(event)=>{

 const body = JSON.parse(event.body);

 const { catalog_id, licensee, fee } = body;

 await supabase
 .from("music_licenses")
 .insert({
  catalog_id,
  licensee,
  fee,
  timestamp:new Date().toISOString()
 });

 return{
  statusCode:200,
  body:JSON.stringify({
   protocol:"license_issued"
  })
 };

};
