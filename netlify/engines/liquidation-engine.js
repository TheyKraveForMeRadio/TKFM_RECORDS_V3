import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async()=>{

 const { data: margins } = await supabase
 .from("margin_accounts")
 .select("*");

 for(const m of margins){

  if(m.collateral < m.margin_required){

   await supabase
   .from("music_derivatives")
   .delete()
   .eq("investor_id",m.investor_id);

  }

 }

 return{
  statusCode:200,
  body:JSON.stringify({status:"liquidations_checked"})
 };

};
