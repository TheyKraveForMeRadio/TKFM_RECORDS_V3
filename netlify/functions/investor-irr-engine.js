import { supabase } from "./supabase.js";

function calculateIRR(cashFlows) {

  let guess = 0.1;

  for (let i = 0; i < 100; i++) {

    let npv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + guess, t);
    }

    guess = guess - npv / 10000;
  }

  return guess;
}

export async function handler(event) {

  const { investor_id } =
    event.queryStringParameters || {};

  const { data: flows } = await supabase
    .from("investor_cashflows")
    .select("amount")
    .eq("investor_id", investor_id)
    .order("created_at");

  const irr = calculateIRR(
    (flows || []).map(f => f.amount)
  );

  return {
    statusCode:200,
    body:JSON.stringify({ irr })
  };
}
