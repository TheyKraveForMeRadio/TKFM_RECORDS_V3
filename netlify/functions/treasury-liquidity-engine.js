import Stripe from "stripe";
import { supabase } from "./supabase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const { data: entities } = await supabase
    .from("entities")
    .select("entity_id, stripe_account_id");

  for (const entity of entities || []) {

    const balance = await stripe.balance.retrieve(
      {},
      { stripeAccount: entity.stripe_account_id }
    );

    const available =
      (balance.available[0]?.amount || 0) / 100;

    if (available > 100000) {

      await supabase.from("liquidity_recommendations")
        .insert({
          entity_id: entity.entity_id,
          suggestion: "Consider yield optimization",
          amount: available
        });
    }
  }

  return { statusCode:200, body:"Liquidity scan complete" };
}
