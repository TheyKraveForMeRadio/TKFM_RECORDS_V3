import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async(event)=>{

 const body = JSON.parse(event.body);

 const { fan_id, catalog_id, price } = body;

 await supabase
 .from("fan_purchases")
 .insert({
  fan_id,
  catalog_id,
  price,
  timestamp:new Date().toISOString()
 });

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"music purchased"
  })
 };

};
