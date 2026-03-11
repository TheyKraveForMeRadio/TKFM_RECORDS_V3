const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async function(event){

 const body = JSON.parse(event.body);

 const {catalog_id, investor_id, amount} = body;

 await supabase.from("trades").insert({
  catalog_id,
  investor_id,
  side:"sell",
  amount,
  timestamp:new Date().toISOString()
 });

 return{
  statusCode:200,
  body:JSON.stringify({status:"sell_order_recorded"})
 };

};
