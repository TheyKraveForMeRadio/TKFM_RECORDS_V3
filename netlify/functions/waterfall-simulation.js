import { supabase } from "./supabase.js";

export async function handler(event) {

  const { pool_id, cashflow } =
    JSON.parse(event.body || "{}");

  const { data: tranches } = await supabase
    .from("tranches")
    .select("*")
    .eq("pool_id", pool_id)
    .order("priority", { ascending:true });

  let remaining = cashflow;
  const distribution = [];

  for (const t of tranches || []) {

    const payout = Math.min(t.size, remaining);

    distribution.push({
      tranche: t.name,
      paid: payout
    });

    remaining -= payout;
    if (remaining <= 0) break;
  }

  return {
    statusCode:200,
    body:JSON.stringify({
      total_cashflow: cashflow,
      distribution,
      leftover: remaining
    })
  };
}
