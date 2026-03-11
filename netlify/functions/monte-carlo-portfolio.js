import { supabase } from "./supabase.js";

function randomDefault(prob) {
  return Math.random() < prob;
}

export async function handler() {

  const { data: ratings } = await supabase
    .from("credit_ratings")
    .select("entity_id, rating");

  const simulations = 1000;
  let totalLoss = 0;

  for (let i=0;i<simulations;i++) {

    let portfolioLoss = 0;

    for (const r of ratings || []) {

      const defaultProb =
        r.rating === "AAA" ? 0.01 :
        r.rating === "AA" ? 0.02 :
        r.rating === "A" ? 0.03 :
        r.rating === "BBB" ? 0.05 :
        r.rating === "BB" ? 0.08 :
        0.15;

      if (randomDefault(defaultProb)) {
        portfolioLoss += 10000; // placeholder exposure
      }
    }

    totalLoss += portfolioLoss;
  }

  const expectedLoss = totalLoss / simulations;

  return {
    statusCode:200,
    body:JSON.stringify({
      simulations,
      expectedLoss
    })
  };
}
