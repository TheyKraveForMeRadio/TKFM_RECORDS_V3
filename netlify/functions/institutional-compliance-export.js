import { supabase } from "./supabase.js";

export async function handler() {

  const { data: ratings } =
    await supabase.from("credit_ratings").select("*");

  const { data: pools } =
    await supabase.from("securitization_pools").select("*");

  const { data: advances } =
    await supabase.from("capital_advances").select("*");

  return {
    statusCode:200,
    body:JSON.stringify({
      generated_at:new Date(),
      ratings,
      pools,
      advances
    })
  };
}
