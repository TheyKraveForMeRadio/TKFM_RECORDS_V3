import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data:catalogs } = await supabase
 .from("catalogs")
 .select("*");

 const ratings = catalogs.map(c => {

  const revenue = c.monthly_revenue * 12;

  let rating="BBB";

  if(revenue > 1000000) rating="AAA";
  else if(revenue > 500000) rating="AA";
  else if(revenue > 100000) rating="A";

  return {

   catalog:c.id,
   rating

  };

 });

 return {

  statusCode:200,
  body:JSON.stringify({ratings})

 };

}
