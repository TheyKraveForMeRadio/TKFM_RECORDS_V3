import { supabase } from "./supabase.js";

export async function handler(event) {

  const { tranche_id } =
    JSON.parse(event.body || "{}");

  const { data: bids } = await supabase
    .from("auction_bids")
    .select("*")
    .eq("tranche_id", tranche_id)
    .order("bid_amount", { ascending:false });

  let allocation = [];

  for (const bid of bids || []) {

    allocation.push({
      investor: bid.investor_id,
      amount: bid.bid_amount
    });
  }

  await supabase
    .from("auction_results")
    .insert({
      tranche_id,
      allocation,
      created_at:new Date()
    });

  return {
    statusCode:200,
    body:JSON.stringify({
      tranche_id,
      allocation
    })
  };
}
