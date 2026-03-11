import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data } = await supabase
 .from("catalogs")
 .select("monthly_revenue, valuation");

 const curve = data.map(c => {

  const annual = c.monthly_revenue * 12;

  const yieldRate = annual / c.valuation;

  return yieldRate;

 });

 const avgYield =
 curve.reduce((a,b)=>a+b,0)/curve.length;

 return {

  statusCode:200,

  body:JSON.stringify({

   benchmark_yield:avgYield

  })

 };

}
