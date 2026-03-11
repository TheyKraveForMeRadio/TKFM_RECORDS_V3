import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(event){

 const sig = event.headers["stripe-signature"];

 const stripeEvent =
 stripe.webhooks.constructEvent(
  event.body,
  sig,
  process.env.STRIPE_WEBHOOK_SECRET
 );

 if(stripeEvent.type === "checkout.session.completed"){

  const session =
  stripeEvent.data.object;

  await supabase
  .from("payments")
  .insert({

   customer:session.customer,
   amount:session.amount_total / 100

  });

 }

 return { statusCode:200 };

}
