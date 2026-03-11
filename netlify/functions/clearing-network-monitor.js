import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data } = await supabase
 .from("clearing_transactions")
 .select("*");

 return {

  statusCode:200,
  body:JSON.stringify({

   network:data,
   generated:Date.now()

  })

 };

}
