const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { user, amount } = JSON.parse(event.body);

    // 🔥 GET USER BALANCE
    const { data: u } = await client
      .from("users")
      .select("*")
      .eq("username", user)
      .single();

    if(!u || u.balance < amount){
      return {
        statusCode:200,
        body: JSON.stringify({ error:"Insufficient balance" })
      };
    }

    // 🔥 LOCK FUNDS (DEDUCT IMMEDIATELY)
    await client.rpc("increment_balance",{
      username:user,
      amount: -amount
    });

    // 🔥 CREATE WITHDRAWAL REQUEST
    await client.from("withdrawals").insert([{
      username:user,
      amount,
      status:"pending"
    }]);

    return {
      statusCode:200,
      body: JSON.stringify({ success:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
