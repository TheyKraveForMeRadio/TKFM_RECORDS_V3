const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { withdrawal_id } = JSON.parse(event.body);

    const { data: w } = await client
      .from("withdrawals")
      .select("*")
      .eq("id", withdrawal_id)
      .single();

    if(!w || w.status !== "pending"){
      return { statusCode:200, body: JSON.stringify({ error:"Invalid request" }) };
    }

    // 🔥 GET USER STRIPE CONNECT ACCOUNT
    const { data: u } = await client
      .from("users")
      .select("stripe_account")
      .eq("username", w.username)
      .single();

    // 🔥 SEND PAYOUT
    await stripe.transfers.create({
      amount: Math.round(w.amount * 100),
      currency: "usd",
      destination: u.stripe_account
    });

    // 🔥 MARK COMPLETE
    await client
      .from("withdrawals")
      .update({ status:"paid" })
      .eq("id", withdrawal_id);

    return {
      statusCode:200,
      body: JSON.stringify({ paid:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
