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

    const totalRevenue =
      (revenue || []).reduce((a,b)=>a+b.amount,0);

    const newLimit = totalRevenue * 0.50;

    await supabase
      .from("credit_profiles")
      .upsert({
        entity_id: entity.entity_id,
        credit_limit: newLimit,
        updated_at: new Date()
      });
  }

  return { statusCode:200, body:"Credit limits adjusted" };
}
