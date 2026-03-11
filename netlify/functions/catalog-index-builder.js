import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data } =
 await supabase
 .from("catalogs")
 .select("*");

 const index = [];

 for(const c of data){

  index.push({

   catalog:c.title,
   revenue:c.monthly_revenue

  });

 }

 return {

  statusCode:200,
  body:JSON.stringify(index)

 };

}
