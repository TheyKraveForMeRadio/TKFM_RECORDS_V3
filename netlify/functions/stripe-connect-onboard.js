import Stripe from "stripe";

const stripe = new Stripe(
 process.env.STRIPE_SECRET_KEY
);

export async function handler(){

 const account =
 await stripe.accounts.create({

  type:"express"

 });

 const link =
 await stripe.accountLinks.create({

  account:account.id,

  refresh_url:
  "https://tkfmrecords.com/reauth",

  return_url:
  "https://tkfmrecords.com/dashboard",

  type:"account_onboarding"

 });

 return {

  statusCode:200,
  body:JSON.stringify({

   url:link.url

  })

 };

}
