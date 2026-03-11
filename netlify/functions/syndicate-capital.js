import { supabase } from "./supabase.js";

export async function handler(event) {

  const { advance_id, investor_id, participation_percent } =
    JSON.parse(event.body || "{}");

  await supabase.from("capital_syndication").insert({
    advance_id,
    investor_id,
    participation_percent,
    created_at: new Date()
  });

  return { statusCode:200, body:"Syndication recorded" };
}
