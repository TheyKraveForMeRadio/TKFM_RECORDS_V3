import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async()=>{

 const { data: trades } = await supabase
 .from("trades")
 .select("*")
 .order("timestamp",{ascending:false})
 .limit(50);

 const { data: margin } = await supabase
 .from("margin_accounts")
 .select("*");

 return{
  statusCode:200,
  body:JSON.stringify({
   trades,
   margin
  })
 };

};
