import { createClient } from "@supabase/supabase-js";

const supabase =
 createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
 );

export async function handler(){

 const { data } =
 await supabase
 .from("investments")
 .select("*");

 const totals = {};

 for(const i of data){

  if(!totals[i.investor])
   totals[i.investor]=0;

  totals[i.investor]+=i.amount;

 }

 const ranked =
 Object.entries(totals)
 .map(x=>({
  investor:x[0],
  invested:x[1]
 }))
 .sort((a,b)=>b.invested-a.invested);

 return {

  statusCode:200,
  body:JSON.stringify(ranked)

 };

}
