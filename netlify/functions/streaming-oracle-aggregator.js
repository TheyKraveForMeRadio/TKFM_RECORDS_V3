import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data } = await supabase
 .from("streaming_events")
 .select("*");

 const totals = {};

 for(const event of data){

  const key = event.track;

  if(!totals[key])
  totals[key] = 0;

  totals[key]++;

 }

 await supabase
 .from("streaming_oracle")
 .insert({

  snapshot:totals

 });

 return {

  statusCode:200,
  body:JSON.stringify({

   tracks:Object.keys(totals).length

  })

 };

}
