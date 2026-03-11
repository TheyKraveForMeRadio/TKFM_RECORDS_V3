import { supabase } from "./supabase.js";

export async function handler(event) {

  const { pool_name } =
    JSON.parse(event.body || "{}");

  const { data: advances } = await supabase
    .from("capital_advances")
    .select("id, amount");

  const totalPoolValue =
    (advances || []).reduce((a,b)=>a+b.amount,0);

  await supabase.from("securitization_pools").insert({
    pool_name,
    total_value: totalPoolValue,
    created_at: new Date()
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      pool_name,
      totalPoolValue
    })
  };
}
