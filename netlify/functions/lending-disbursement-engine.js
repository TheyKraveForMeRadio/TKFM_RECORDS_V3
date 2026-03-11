import Stripe from "stripe";
import { supabase } from "./supabase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { entity_id, amount } =
    JSON.parse(event.body || "{}");

  const { data: entity } = await supabase
    .from("entities")
    .select("stripe_account_id")
    .eq("entity_id", entity_id)
    .single();

  if (!entity?.stripe_account_id) {
    return { statusCode:400, body:"Stripe account missing" };
  }

  const transfer = await stripe.transfers.create({
    amount: amount * 100,
    currency: "usd",
    destination: entity.stripe_account_id,
    metadata: {
      type: "capital_advance",
      entity_id
    }
  });

  await supabase.from("capital_advances").insert({
    entity_id,
    amount,
    repaid_amount: 0,
    interest_accrued: 0,
    status: "active",
    stripe_transfer_id: transfer.id,
    issued_at: new Date()
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      success:true,
      transfer_id: transfer.id
    })
  };
}
