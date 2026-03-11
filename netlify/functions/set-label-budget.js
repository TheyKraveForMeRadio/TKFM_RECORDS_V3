import { supabase } from "./supabase.js";

export async function handler(event) {

  const { entity_id, monthly_limit } =
    JSON.parse(event.body || "{}");

  await supabase
    .from("treasury_budgets")
    .upsert({
      entity_id,
      monthly_limit,
      updated_at: new Date()
    });

  return { statusCode:200, body:"Budget set" };
}
