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

 const scores = {};

 for(const r of data){

  if(!scores[r.track]) scores[r.track]=0;

  scores[r.track]+=r.revenue;

 }

 const ranked =
 Object.entries(scores)
 .map(x=>({
  catalog:x[0],
  score:x[1]
 }))
 .sort((a,b)=>b.score-a.score);

 return {
  statusCode:200,
  body:JSON.stringify(ranked)
 };

}
