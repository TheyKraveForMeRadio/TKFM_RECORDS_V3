import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data:catalogs } =
 await supabase.from("catalogs").select("*");

 const { data:trades } =
 await supabase.from("trades").select("*");

 return {

  statusCode:200,
  body:JSON.stringify({

   catalog_count:catalogs.length,
   total_trades:trades.length

  })

 };

}
