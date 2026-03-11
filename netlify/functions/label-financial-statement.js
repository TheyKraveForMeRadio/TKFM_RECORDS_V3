import { supabase } from "./supabase.js";

export async function handler(event) {

  const { entity_id } =
    event.queryStringParameters || {};

  const { data: revenue } = await supabase
    .from("revenue_events")
    .select("amount")
    .eq("entity_id", entity_id);

  const { data: advances } = await supabase
    .from("capital_advances")
    .select("amount, repaid_amount")
    .eq("entity_id", entity_id);

  const totalRevenue =
    (revenue || []).reduce((a,b)=>a+b.amount,0);

  const totalAdvances =
    (advances || []).reduce((a,b)=>a+b.amount,0);

  const totalRepaid =
    (advances || []).reduce((a,b)=>a+(b.repaid_amount||0),0);

  return {
    statusCode:200,
    body:JSON.stringify({
      totalRevenue,
      totalAdvances,
      totalRepaid,
      outstandingDebt:
        totalAdvances - totalRepaid
    })
  };
}
