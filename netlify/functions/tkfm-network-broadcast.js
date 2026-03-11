import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async()=>{

 const { data: prices } = await supabase
 .from("price_history")
 .select("*")
 .limit(100);

 return{
  statusCode:200,
  body:JSON.stringify({
   broadcast:"market_data",
   prices
  })
 };

};
