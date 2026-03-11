import { createClient } from "@supabase/supabase-js";

const supabase =
 createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
 );

export async function handler(event){

 const body =
 JSON.parse(event.body);

 const { data } =
 await supabase
 .from("investments")
 .select("*")
 .eq("investor", body.target);

 for(const inv of data){

  await supabase
  .from("investments")
  .insert({

   catalog_id:inv.catalog_id,
   investor:body.follower,
   amount:inv.amount

  });

 }

 return {

  statusCode:200,

  body:JSON.stringify({
   copied:data.length
  })

 };

}
