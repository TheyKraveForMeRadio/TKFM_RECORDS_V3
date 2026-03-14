import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async(event)=>{

 try{

  const body = JSON.parse(event.body);

  const { investor_id, amount } = body;

  await supabase
  .from("collateral_vault")
  .insert({
   investor_id,
   collateral_amount:amount,
   timestamp:new Date().toISOString()
  });

  return{
   statusCode:200,
   body:JSON.stringify({status:"collateral_added"})
  };

 }catch(err){

  return{
   statusCode:500,
   body:JSON.stringify({error:err.message})
  };

 }

};
