import Stripe from "stripe";
import { supabase } from "./supabase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const { data: risks } = await supabase
    .from("treasury_risk_scores")
    .select("*")
    .gt("score", 85);

  for (const risk of risks || []) {

    const { data: entity } = await supabase
      .from("entities")
      .select("stripe_account_id")
      .eq("entity_id", risk.entity_id)
      .single();

    const cards = await stripe.issuing.cards.list(
      { limit: 50 },
      { stripeAccount: entity.stripe_account_id }
    );

    for (const card of cards.data) {

      await stripe.issuing.cards.update(
        card.id,
        { status: "inactive" },
        { stripeAccount: entity.stripe_account_id }
      );

    }
  }

  return { statusCode:200, body:"Freeze enforcement complete" };
}
