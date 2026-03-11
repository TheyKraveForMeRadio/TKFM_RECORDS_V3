import { supabase } from "./supabase.js";

export async function handler(event) {

  const { name, slug } =
    JSON.parse(event.body || "{}");

  await supabase.from("entities").insert({
    entity_id: crypto.randomUUID(),
    name,
    slug,
    created_at:new Date()
  });

  return { statusCode:200, body:"Entity created" };
}
