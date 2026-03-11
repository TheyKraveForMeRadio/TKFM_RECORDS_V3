import { supabase } from "./supabase.js";

export async function handler(event) {

  const { entity_id, amount } =
    JSON.parse(event.body || "{}");

  await supabase.from("capital_advances").insert({
    entity_id,
    amount,
    issued_at:new Date(),
    status:"active"
  });

  return { statusCode:200, body:"Advance recorded" };
}
