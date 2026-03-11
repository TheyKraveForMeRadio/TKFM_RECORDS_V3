import Stripe from "stripe";
import { supabase } from "./supabase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const { data: entities } = await supabase
    .from("entities")
    .select("entity_id, stripe_account_id");

  for (const entity of entities || []) {

    const charges = await stripe.issuing.transactions.list(
      { limit: 20 },
      { stripeAccount: entity.stripe_account_id }
    );

    let riskScore = 0;

    for (const tx of charges.data) {

      if (tx.amount > 500000) riskScore += 30; // >$5k
      if (tx.merchant_category === "gambling") riskScore += 40;
      if (tx.merchant_category === "adult_entertainment") riskScore += 50;

    }

    await supabase
      .from("treasury_risk_scores")
      .upsert({
        entity_id: entity.entity_id,
        score: riskScore,
        updated_at: new Date()
      });
  }

  return { statusCode:200, body:"Card anomaly scan complete" };
}
