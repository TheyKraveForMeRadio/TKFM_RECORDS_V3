import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async () => {

 try {

  const { data: catalogs } = await supabase
  .from("price_history")
  .select("*");

  if (!catalogs) {
   return {
    statusCode:200,
    body:JSON.stringify({status:"no data"})
   };
  }

  let total = 0;

  for (const catalog of catalogs) {
   total += Number(catalog.price);
  }

  const indexValue = total / catalogs.length;

  await supabase
  .from("music_indexes")
  .insert({
   name:"TKFM_GLOBAL_INDEX",
   value:indexValue,
   timestamp:new Date().toISOString()
  });

  return {
   statusCode:200,
   body:JSON.stringify({
    status:"index_updated",
    value:indexValue
   })
  };

 } catch(err){

  return {
   statusCode:500,
   body:JSON.stringify({error:err.message})
  };

 }

};
