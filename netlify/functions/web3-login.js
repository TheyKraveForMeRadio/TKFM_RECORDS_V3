const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { address } = JSON.parse(event.body);

    if(!address){
      return { statusCode:200, body: JSON.stringify({ error:"no address" }) };
    }

    // CHECK IF EXISTS
    const { data } = await client
      .from("users")
      .select("*")
      .eq("username", address)
      .maybeSingle();

    if(!data){
      // CREATE USER
      await client.from("users").insert([{
        username: address,
        balance: 0,
        role: "user"
      }]);
    }

    return {
      statusCode:200,
      headers:{ "Access-Control-Allow-Origin":"*" },
      body: JSON.stringify({ success:true })
    };

  }catch(err){
    return { statusCode:200, body: JSON.stringify({ error: err.message }) };
  }

};
