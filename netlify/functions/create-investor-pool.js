import { supabase } from "./supabase.js";

export async function handler(event) {

  const { investor_name, capital_commitment } =
    JSON.parse(event.body || "{}");

  await supabase.from("investor_pools").insert({
    investor_name,
    capital_commitment,
    deployed: 0,
    created_at: new Date()
  });

  return { statusCode:200, body:"Investor pool created" };
}
