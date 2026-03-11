import { supabase } from "./supabase.js";

export async function handler(event) {

  const { pool_id, entity_id, amount } =
    JSON.parse(event.body || "{}");

  await supabase
    .from("investor_pools")
    .update({
      deployed: supabase.rpc("increment", { x: amount })
    })
    .eq("id", pool_id);

  await supabase
    .from("capital_advances")
    .insert({
      entity_id,
      amount,
      funded_by_pool: pool_id,
      status:"active",
      issued_at:new Date()
    });

  return { statusCode:200, body:"Capital deployed" };
}
