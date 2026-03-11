import Stripe from "stripe";

const stripe = new Stripe(
 process.env.STRIPE_SECRET_KEY
);

export async function handler(){

 const session =
 await stripe.checkout.sessions.create({

  mode:"subscription",

  line_items:[{

   price:process.env.STRIPE_PRICE_SAAS_MONTHLY,
   quantity:1

  }],

  success_url:
  "https://tkfmrecords.com/success",

  cancel_url:
  "https://tkfmrecords.com/cancel"

 });

 return {

  statusCode:200,
  body:JSON.stringify({

   url:session.url

  })

 };

}
