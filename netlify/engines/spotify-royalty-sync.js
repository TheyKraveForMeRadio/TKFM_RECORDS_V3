import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async()=>{

 const simulatedRevenue = Math.random() * 100;

 await supabase
 .from("streaming_revenue_events")
 .insert({
  platform:"spotify",
  revenue_usd:simulatedRevenue,
  processed:false,
  timestamp:new Date().toISOString()
 });

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"spotify revenue ingested",
   amount:simulatedRevenue
  })
 };

};
