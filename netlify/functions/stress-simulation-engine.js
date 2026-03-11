import { supabase } from "./supabase.js";

export async function handler() {

  const { data: advances } = await supabase
    .from("capital_advances")
    .select("entity_id, amount, repaid_amount");

  const results = [];

  for (const adv of advances || []) {

    const outstanding =
      adv.amount - (adv.repaid_amount || 0);

    const stress30 = outstanding * 1.30;
    const stress50 = outstanding * 1.50;

    results.push({
      entity_id: adv.entity_id,
      current_outstanding: outstanding,
      stress_30pct: stress30,
      stress_50pct: stress50
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify(results)
  };
}
