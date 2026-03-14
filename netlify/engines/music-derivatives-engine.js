import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async () => {

 try {

  const { data: catalogs, error } = await supabase
   .from("catalog_revenue_totals")
   .select("*");

  if(error){
   throw error;
  }

  if(!catalogs || catalogs.length === 0){
   return {
    statusCode:200,
    body:JSON.stringify({status:"no catalogs"})
   };
  }

  const derivatives = [];

  for(const c of catalogs){

   const revenue = Number(c.total_revenue || 0);

   const forecastYield = revenue * 1.1;

   derivatives.push({
    catalog_id: c.catalog_id,
    forecast_yield: forecastYield,
    contract_type: "futures",
    expiry: new Date(
      Date.now() + 90 * 24 * 60 * 60 * 1000
    ).toISOString(),
    updated_at: new Date().toISOString()
   });

  }

  await supabase
   .from("music_derivatives")
   .upsert(derivatives, {
    onConflict: "catalog_id,contract_type"
   });

  return {
   statusCode:200,
   body:JSON.stringify({
    status:"derivatives_generated",
    count: derivatives.length
   })
  };

 } catch(err){

  return {
   statusCode:500,
   body:JSON.stringify({error:err.message})
  };

 }

};
