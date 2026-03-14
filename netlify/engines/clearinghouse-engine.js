import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async () => {

 try {

  const { data: trades } = await supabase
  .from("trades")
  .select("*")
  .eq("cleared", false);

  if(!trades || trades.length === 0){
   return {
    statusCode:200,
    body:JSON.stringify({status:"no trades"})
   };
  }

  for(const trade of trades){

   await supabase
   .from("investor_balances")
   .update({
     balance_usd: trade.amount
   })
   .eq("investor_id", trade.buyer);

   await supabase
   .from("trades")
   .update({cleared:true})
   .eq("id", trade.id);

  }

  return {
   statusCode:200,
   body:JSON.stringify({
     status:"trades_cleared",
     count:trades.length
   })
  };

 } catch(err){

  return {
   statusCode:500,
   body:JSON.stringify({error:err.message})
  };

 }

};
