import { supabase } from "./supabase.js";

export async function handler() {

  const { data: advances } = await supabase
    .from("capital_advances")
    .select("amount, repaid_amount");

  const totalExposure =
    (advances || []).reduce((a,b)=>a+b.amount,0);

  const totalOutstanding =
    (advances || []).reduce(
      (a,b)=>a+(b.amount - (b.repaid_amount||0)),0
    );

  const defaultRatio =
    totalOutstanding / (totalExposure || 1);

  return {
    statusCode:200,
    body:JSON.stringify({
      totalExposure,
      totalOutstanding,
      defaultRatio
    })
  };
}
