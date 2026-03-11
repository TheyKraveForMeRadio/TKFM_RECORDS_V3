import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(event){

 const body = JSON.parse(event.body);

 await supabase
 .from("artists")
 .insert({

  name:body.name,
  wallet:body.wallet,
  email:body.email

 });

 return {
  statusCode:200,
  body:JSON.stringify({artist_created:true})
 };

}
