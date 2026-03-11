import { createClient } from "@supabase/supabase-js";

const supabase =
 createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
 );

export async function handler(event){

 const body =
 JSON.parse(event.body);

 await supabase
 .from("investor_follows")
 .insert({

  follower:body.follower,
  investor:body.investor

 });

 return {

  statusCode:200,

  body:JSON.stringify({
   followed:true
  })

 };

}
