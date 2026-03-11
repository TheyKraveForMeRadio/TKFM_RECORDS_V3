import { supabase } from "./supabase.js";

export async function handler(event) {

  const { entity_id, revenue_amount } =
    JSON.parse(event.body || "{}");

  const { data: advance } = await supabase
    .from("capital_advances")
    .select("*")
    .eq("entity_id", entity_id)
    .eq("status","active")
    .single();

  if (!advance) {
    return { statusCode:200, body:"No active advance" };
  }

  const repaymentRate = 0.20; // 20% of revenue
  const repayment = revenue_amount * repaymentRate;

  await supabase
    .from("capital_advances")
    .update({
      repaid_amount:
        (advance.repaid_amount || 0) + repayment
    })
    .eq("id", advance.id);

  return {
    statusCode:200,
    body:JSON.stringify({
      repaid: repayment
    })
  };
}
