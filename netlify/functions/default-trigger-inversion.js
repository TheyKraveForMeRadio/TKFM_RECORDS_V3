import { supabase } from "./supabase.js";

export async function handler(event) {

  const { pool_id, loss_amount } =
    JSON.parse(event.body || "{}");

  const { data: tranches } = await supabase
    .from("tranches")
    .select("*")
    .eq("pool_id", pool_id)
    .order("priority", { ascending:false }); // reverse order

  let remainingLoss = loss_amount;
  const writeDowns = [];

  for (const t of tranches || []) {

    const wipe = Math.min(t.size, remainingLoss);

    writeDowns.push({
      tranche: t.name,
      write_down: wipe
    });

    remainingLoss -= wipe;
    if (remainingLoss <= 0) break;
  }

  return {
    statusCode:200,
    body:JSON.stringify({
      loss_amount,
      writeDowns,
      remainingLoss
    })
  };
}
