import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(event){

 const body = JSON.parse(event.body);

 await supabase
 .from("streaming_revenue")
 .insert({

  catalog_id:body.catalog,
  streams:body.streams,
  revenue:body.revenue

 });

 return {

  statusCode:200,
  body:JSON.stringify({status:"revenue stored"})

 };

}
