import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async(event)=>{

 const body = JSON.parse(event.body);

 const { investor_id, collateral, loan_amount } = body;

 if(loan_amount > collateral * 0.6){

  return{
   statusCode:400,
   body:JSON.stringify({
    error:"exceeds LTV limit"
   })
  };

 }

 await supabase
 .from("music_loans")
 .insert({
  investor_id,
  collateral,
  loan_amount,
  timestamp:new Date().toISOString()
 });

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"loan issued"
  })
 };

};
