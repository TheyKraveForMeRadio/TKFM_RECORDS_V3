import { supabase } from "./supabase.js";

export async function handler(event) {

  const { advance_id, principal, priority } =
    JSON.parse(event.body || "{}");

  await supabase.from("capital_tranches").insert({
    advance_id,
    principal,
    priority,
    repaid: 0
  });

  return { statusCode:200, body:"Tranche created" };
}
