import { createClient } from "@supabase/supabase-js";

const supabase =
 createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
 );

export async function handler(){

 const { data } =
 await supabase
 .from("streaming_revenue")
 .select("*");

 const valuations = {};

 for(const r of data){

  if(!valuations[r.track])
  valuations[r.track] = 0;

  valuations[r.track] += r.revenue;

 }

 const results = [];

 for(const t in valuations){

  results.push({

   catalog:t,

   monthly_revenue:valuations[t],

   valuation:
   valuations[t] * 36

  });

 }

 return {

  statusCode:200,

  body:JSON.stringify(results)

 };

}
