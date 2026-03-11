import { supabase } from "./supabase.js";

export async function handler(event) {

  const { investor_id, tranche_id, amount } =
    JSON.parse(event.body || "{}");

  await supabase.from("investor_allocations").insert({
    investor_id,
    tranche_id,
    amount,
    created_at:new Date()
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      message:"Allocation recorded"
    })
  };
}
