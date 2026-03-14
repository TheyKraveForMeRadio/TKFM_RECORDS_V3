import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async()=>{

 const { data: catalogs } = await supabase
 .from("catalogs")
 .select("*");

 for(const c of catalogs){

  await supabase
  .from("trades")
  .insert({
   catalog_id:c.id,
   buyer:"AI_AGENT",
   seller:"MARKET",
   amount:100,
   timestamp:new Date().toISOString()
  });

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"ai trades executed"
  })
 };

};
