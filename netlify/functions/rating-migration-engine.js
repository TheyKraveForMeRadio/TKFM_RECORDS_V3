import { supabase } from "./supabase.js";

const transitionMatrix = {
  AAA: { AAA:0.92, AA:0.05, A:0.02, Default:0.01 },
  AA:  { AAA:0.03, AA:0.90, A:0.05, Default:0.02 },
  A:   { AA:0.04, A:0.85, BBB:0.08, Default:0.03 },
  BBB: { A:0.05, BBB:0.80, BB:0.10, Default:0.05 },
  BB:  { BBB:0.05, BB:0.75, B:0.15, Default:0.05 },
  B:   { BB:0.05, B:0.70, Default:0.25 }
};

export async function handler() {

  const { data: ratings } = await supabase
    .from("credit_ratings")
    .select("entity_id, rating");

  const migrations = [];

  for (const r of ratings || []) {

    const probs = transitionMatrix[r.rating] || {};
    migrations.push({
      entity_id: r.entity_id,
      current_rating: r.rating,
      probabilities: probs
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify(migrations)
  };
}
