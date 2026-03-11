import { supabase } from "./supabase.js";

export async function handler(event) {

  const { advance_id, cash_flow } =
    JSON.parse(event.body || "{}");

  const { data: tranches } = await supabase
    .from("capital_tranches")
    .select("*")
    .eq("advance_id", advance_id)
    .order("priority", { ascending: true });

  let remaining = cash_flow;
  const distributions = [];

  for (const tranche of tranches || []) {

    const owed = tranche.principal - (tranche.repaid || 0);

    const payout = Math.min(owed, remaining);

    remaining -= payout;

    distributions.push({
      tranche_id: tranche.id,
      paid: payout
    });

    await supabase
      .from("capital_tranches")
      .update({
        repaid: (tranche.repaid || 0) + payout
      })
      .eq("id", tranche.id);

    if (remaining <= 0) break;
  }

  return {
    statusCode:200,
    body:JSON.stringify(distributions)
  };
}
