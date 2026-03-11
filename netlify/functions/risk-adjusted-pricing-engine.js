import { supabase } from "./supabase.js";

export async function handler() {

  const { data: advances } = await supabase
    .from("capital_advances")
    .select("id, entity_id, amount, repaid_amount");

  for (const advance of advances || []) {

    const { data: risk } = await supabase
      .from("treasury_risk_scores")
      .select("score")
      .eq("entity_id", advance.entity_id)
      .single();

    let baseAPR = 0.15; // 15%
    let riskAdj = (risk?.score || 50) / 100;

    let adjustedAPR = baseAPR + (riskAdj * 0.10); // up to +10%

    await supabase
      .from("capital_advances")
      .update({
        dynamic_apr: adjustedAPR
      })
      .eq("id", advance.id);
  }

  return { statusCode:200, body:"Risk pricing updated" };
}
