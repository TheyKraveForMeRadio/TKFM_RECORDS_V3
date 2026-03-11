import Stripe from "stripe";
import { supabase } from "./supabase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const { data: entities } = await supabase
    .from("entities")
    .select("stripe_account_id");

  let total = 0;

  for (const entity of entities || []) {

    const balance = await stripe.balance.retrieve(
      {},
      { stripeAccount: entity.stripe_account_id }
    );

    total += (balance.available[0]?.amount || 0);
  }

  return {
    statusCode:200,
    body:JSON.stringify({
      pooled_balance: total / 100
    })
  };
}
