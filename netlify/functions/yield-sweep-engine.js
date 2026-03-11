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

    if (available > 50000) {

      await supabase.from("yield_recommendations")
        .insert({
          entity_id: entity.entity_id,
          amount: available,
          recommendation: "Move idle funds to yield instrument",
          created_at: new Date()
        });
    }
  }

  return { statusCode:200, body:"Yield scan complete" };
}
