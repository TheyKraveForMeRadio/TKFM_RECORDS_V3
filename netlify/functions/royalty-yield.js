import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data } =
 await supabase
 .from("royalty_payments")
 .select("*");

 let total = 0;

 for(const p of data){

  total += p.payout;

 }

 const apy =
 (total / 1000000) * 100;

 return {

  statusCode:200,

  body:JSON.stringify({

   total_yield:total,
   apy

  })

 };

}
