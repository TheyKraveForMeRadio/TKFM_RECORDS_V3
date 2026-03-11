import Stripe from "stripe";
import { supabase } from "./supabase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const invoice = JSON.parse(event.body || "{}");

  const entity_id = invoice.metadata?.entity_id;
  if (!entity_id) return { statusCode:200 };

  const revenueAmount = invoice.amount_paid / 100;

  const { data: advance } = await supabase
    .from("capital_advances")
    .select("*")
    .eq("entity_id", entity_id)
    .eq("status","active")
    .single();

  if (!advance) return { statusCode:200 };

  const repaymentRate = 0.25;
  const repayment = revenueAmount * repaymentRate;

  await supabase
    .from("capital_advances")
    .update({
      repaid_amount:
        (advance.repaid_amount || 0) + repayment
    })
    .eq("id", advance.id);

  return { statusCode:200, body:"Collateral repayment applied" };
}
