import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data } = await supabase
 .from("treasury_reserves")
 .select("*");

 const total =
 data.reduce((a,b)=>a+b.amount,0);

 return {

  statusCode:200,
  body:JSON.stringify({

   reserve_supply:total,
   generated:Date.now()

  })

 };

}
