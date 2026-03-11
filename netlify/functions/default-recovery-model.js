import { supabase } from "./supabase.js";

export async function handler() {

  const { data: advances } = await supabase
    .from("capital_advances")
    .select("amount, repaid_amount");

  let totalLoss = 0;
  let totalExposure = 0;

  for (const adv of advances || []) {

    totalExposure += adv.amount;

    const unpaid =
      adv.amount - (adv.repaid_amount || 0);

    if (unpaid > adv.amount * 0.7) {
      totalLoss += unpaid * 0.5; // 50% recovery assumption
    }
  }

  const recoveryRate =
    1 - (totalLoss / (totalExposure || 1));

  return {
    statusCode:200,
    body:JSON.stringify({
      totalExposure,
      estimatedRecoveryRate: recoveryRate
    })
  };
}
