import { supabase } from "./supabase.js";

export async function handler(event) {

  const { entity_id } =
    JSON.parse(event.body || "{}");

  const { data: revenue } = await supabase
    .from("revenue_events")
    .select("amount")
    .eq("entity_id", entity_id);

  const avgRevenue =
    (revenue || []).reduce((a,b)=>a+b.amount,0) /
    (revenue?.length || 1);

  const maxAdvance = avgRevenue * 3;

  return {
    statusCode:200,
    body:JSON.stringify({
      eligible:true,
      max_advance:maxAdvance
    })
  };
}
