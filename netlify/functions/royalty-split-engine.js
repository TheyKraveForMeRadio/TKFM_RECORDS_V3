import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(event){

 const body = JSON.parse(event.body);

 await supabase
 .from("royalty_splits")
 .insert({

  catalog_id:body.catalog,
  artist_wallet:body.artist,
  percent:body.percent

 });

 return {

  statusCode:200,
  body:JSON.stringify({status:"split saved"})

 };

}
