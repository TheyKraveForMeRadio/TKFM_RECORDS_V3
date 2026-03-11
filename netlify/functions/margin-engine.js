import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async () => {

 try {

  const { data: positions } = await supabase
  .from("music_derivatives")
  .select("*");

  for(const p of positions){

   const marginRequired = p.forecast_yield * 0.2;

   await supabase
   .from("margin_accounts")
   .upsert({
     investor_id:p.investor_id,
     margin_required:marginRequired
   });

  }

  return{
   statusCode:200,
   body:JSON.stringify({
     status:"margin_updated"
   })
  };

 } catch(err){

  return{
   statusCode:500,
   body:JSON.stringify({error:err.message})
  };

 }

};
