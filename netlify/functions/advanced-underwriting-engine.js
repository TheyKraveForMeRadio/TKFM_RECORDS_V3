import { supabase } from "./supabase.js";

export async function handler(event) {

  const { entity_id } =
    JSON.parse(event.body || "{}");

  const { data: revenue } = await supabase
    .from("revenue_events")
    .select("amount")
    .eq("entity_id", entity_id);

  const { data: risk } = await supabase
    .from("treasury_risk_scores")
    .select("score")
    .eq("entity_id", entity_id)
    .single();

  const avgRevenue =
    (revenue || []).reduce((a,b)=>a+b.amount,0) /
    (revenue?.length || 1);

  let score = 0;

  if (avgRevenue > 10000) score += 40;
  if (risk?.score < 40) score += 40;
  if ((revenue?.length || 0) > 12) score += 20;

  return {
    statusCode:200,
    body:JSON.stringify({
      underwriting_score: score,
      tier: score > 80 ? "A" :
            score > 60 ? "B" :
            score > 40 ? "C" : "D"
    })
  };
}
