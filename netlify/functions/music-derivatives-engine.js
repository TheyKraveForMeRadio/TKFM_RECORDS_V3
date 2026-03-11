import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async () => {

 try {

  const { data: catalogs } = await supabase
  .from("catalog_revenue_totals")
  .select("*");

  if(!catalogs){
   return {
    statusCode:200,
    body:JSON.stringify({status:"no catalogs"})
   };
  }

  let derivatives = [];

  for(const c of catalogs){

   const forecastYield = Number(c.total_revenue) * 1.1;

   derivatives.push({
    catalog_id:c.catalog_id,
    forecast_yield:forecastYield,
    contract_type:"futures",
    expiry:new Date(
      Date.now() + 90*24*60*60*1000
    ).toISOString()
   });

  }

  await supabase
  .from("music_derivatives")
  .insert(derivatives);

  return {
   statusCode:200,
   body:JSON.stringify({
    status:"derivatives_generated",
    count:derivatives.length
   })
  };

 } catch(err){

  return{
   statusCode:500,
   body:JSON.stringify({error:err.message})
  };

 }

};
