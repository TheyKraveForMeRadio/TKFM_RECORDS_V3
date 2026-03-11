import Stripe from "stripe";

const stripe =
 new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event){

 const body = JSON.parse(event.body);

 const payout =
 await stripe.transfers.create({

  amount:body.amount * 100,

  currency:"usd",

  destination:body.account

 });

 return {

  statusCode:200,

  body:JSON.stringify({

   payout:payout.id

  })

 };

}
