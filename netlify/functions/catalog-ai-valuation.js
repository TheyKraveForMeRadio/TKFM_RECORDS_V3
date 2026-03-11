import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data } = await supabase
 .from("catalogs")
 .select("*");

 const valuations = data.map(c => {

  const annual =
  c.monthly_revenue * 12;

  const multiple = 8;

  return {

   catalog:c.title,
   valuation:annual * multiple

  };

 });

 return {

  statusCode:200,
  body:JSON.stringify({

   valuations

  })

 };

}
