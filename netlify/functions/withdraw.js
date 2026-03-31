const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { user, amount } = JSON.parse(event.body);

    const { data } = await client
      .from("users")
      .select("*")
      .eq("username", user)
      .single();

    if(data.balance < amount){
      return { statusCode:200, body: JSON.stringify({ error:"insufficient funds" }) };
    }

    // subtract balance
    await client.from("users").update({
      balance: data.balance - amount
    }).eq("id", data.id);

    // store withdrawal request
    await client.from("withdrawals").insert([{
      username: user,
      amount,
      status: "pending"
    }]);

    return {
      statusCode:200,
      body: JSON.stringify({ success:true })
    };

  }catch(err){
    return { statusCode:200, body: JSON.stringify({ error: err.message }) };
  }

};
