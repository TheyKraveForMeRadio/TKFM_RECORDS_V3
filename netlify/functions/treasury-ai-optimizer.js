import { supabase } from "./supabase.js";

export async function handler() {

  const { data: entities } = await supabase
    .from("entities")
    .select("entity_id");

  for (const entity of entities || []) {

    const { data: revenue } = await supabase
      .from("revenue_events")
      .select("amount")
      .eq("entity_id", entity.entity_id);

    const { data: advances } = await supabase
      .from("capital_advances")
      .select("amount, repaid_amount, interest_accrued")
      .eq("entity_id", entity.entity_id);

    const totalRevenue =
      (revenue || []).reduce((a,b)=>a+b.amount,0);

    const totalDebt =
      (advances || []).reduce((a,b)=>
        a + (b.amount - (b.repaid_amount||0))
      ,0);

    let recommendation = "Stable";

    if (totalDebt > totalRevenue * 2) {
      recommendation = "Reduce exposure";
    }

    if (totalRevenue > totalDebt * 3) {
      recommendation = "Eligible for additional capital";
    }

    await supabase
      .from("treasury_ai_recommendations")
      .upsert({
        entity_id: entity.entity_id,
        recommendation,
        updated_at: new Date()
      });
  }

  return { statusCode:200, body:"AI optimization complete" };
}
