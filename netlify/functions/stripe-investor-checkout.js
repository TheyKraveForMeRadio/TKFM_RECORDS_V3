import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(event){

 const body = JSON.parse(event.body);

 const session =
 await stripe.checkout.sessions.create({

  payment_method_types:["card"],

  line_items:[{

   price_data:{
    currency:"usd",
    product_data:{
     name:"Catalog Share"
    },
    unit_amount:body.amount * 100
   },

   quantity:1

  }],

  mode:"payment",

  success_url:
  "https://tkfmrecords.com/invest-success",

  cancel_url:
  "https://tkfmrecords.com/cancel"

 });

 await supabase
 .from("investments")
 .insert({

  catalog_id:body.catalog,
  investor:body.wallet,
  amount:body.amount

 });

 return {

  statusCode:200,
  body:JSON.stringify({
   url:session.url
  })

 };

}
