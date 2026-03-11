import { supabase } from "./supabase.js";

function baseYield(priority) {
  if (priority === 1) return 0.06;   // Senior
  if (priority === 2) return 0.10;   // Mezz
  return 0.18;                        // Equity
}

export async function handler() {

  const { data: tranches } = await supabase
    .from("tranches")
    .select("*");

  const results = [];

  for (const t of tranches || []) {

    const riskAdjustment = t.priority * 0.01;
    const yieldRate = baseYield(t.priority) + riskAdjustment;

    await supabase
      .from("tranches")
      .update({ dynamic_yield: yieldRate })
      .eq("id", t.id);

    results.push({
      tranche: t.name,
      yield: yieldRate
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify(results)
  };
}
