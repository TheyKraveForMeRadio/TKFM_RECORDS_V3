import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data } =
 await supabase
 .from("streaming_revenue")
 .select("*");

 const payouts = [];

 for(const r of data){

  payouts.push({

   artist:r.artist,
   amount:r.revenue

  });

 }

 await supabase
 .from("royalty_payments")
 .insert(payouts);

 return {
  statusCode:200,
  body:JSON.stringify({
   payouts:payouts.length
  })
 };

}
