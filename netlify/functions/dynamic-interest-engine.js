import { supabase } from "./supabase.js";

export async function handler() {

  const annualRate = 0.18; // 18% APR
  const dailyRate = annualRate / 365;

  const { data: advances } = await supabase
    .from("capital_advances")
    .select("*")
    .eq("status","active");

  for (const advance of advances || []) {

    const outstanding =
      advance.amount - (advance.repaid_amount || 0);

    const dailyInterest =
      outstanding * dailyRate;

    await supabase
      .from("capital_advances")
      .update({
        interest_accrued:
          (advance.interest_accrued || 0) + dailyInterest
      })
      .eq("id", advance.id);
  }

  return { statusCode:200, body:"Interest accrued" };
}
