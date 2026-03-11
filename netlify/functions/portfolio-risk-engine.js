import { supabase } from "./supabase.js";

export async function handler() {

  const { data: advances } = await supabase
    .from("capital_advances")
    .select("amount, repaid_amount, dynamic_apr");

  let totalExposure = 0;
  let totalOutstanding = 0;

  for (const adv of advances || []) {
    totalExposure += adv.amount;
    totalOutstanding +=
      adv.amount - (adv.repaid_amount || 0);
  }

  const defaultProbability =
    totalOutstanding / (totalExposure || 1);

  return {
    statusCode:200,
    body:JSON.stringify({
      totalExposure,
      totalOutstanding,
      defaultProbability
    })
  };
}
