import { createClient } from "@supabase/supabase-js";

const supabase =
 createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
 );

export async function handler(){

 const { data } =
 await supabase
 .from("streaming_events")
 .select("*");

 const prices = {};

 for(const e of data){

  const track = e.track;

  if(!prices[track])
  prices[track] = 0;

  prices[track]++;

 }

 const valuations = [];

 for(const t in prices){

  valuations.push({

   track:t,
   value:prices[t] * 0.002

  });

 }

 return {

  statusCode:200,
  body:JSON.stringify({

   valuations

  })

 };

}
