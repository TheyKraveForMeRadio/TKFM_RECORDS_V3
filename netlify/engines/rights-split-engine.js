import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async(event)=>{

 const body = JSON.parse(event.body);

 const { catalog_id, contributors } = body;

 for(const c of contributors){

  await supabase
  .from("rights_splits")
  .insert({
   catalog_id,
   contributor:c.wallet,
   share:c.share
  });

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"rights recorded"
  })
 };

};
