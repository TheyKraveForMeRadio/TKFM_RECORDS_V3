import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(event){

 const body = JSON.parse(event.body);

 await supabase
 .from("trades")
 .insert({

  catalog_id:body.catalog_id,
  amount:body.amount || 1

 });

 return {

  statusCode:200,
  body:JSON.stringify({

   status:"trade recorded"

  })

 };

}
