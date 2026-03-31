const Stripe = require("stripe");
const { client } = require("./_supabase");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {

  try{

    const sig = event.headers["stripe-signature"];

    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if(stripeEvent.type === "checkout.session.completed"){

      const session = stripeEvent.data.object;

      const user = session.metadata.user;
      const amount = Number(session.metadata.amount);

      const { data: userData } = await client
        .from("users")
        .select("*")
        .eq("username", user)
        .single();

      await client.from("users").update({
        balance: userData.balance + amount
      }).eq("id", userData.id);

    }

    return { statusCode:200, body:"ok" };

  }catch(err){
    return { statusCode:400, body: err.message };
  }
};
