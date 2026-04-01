const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { username } = JSON.parse(event.body);

    const { data } = await client
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if(!data){
      return { statusCode:200, body: JSON.stringify({ error:"user not found" }) };
    }

    return {
      statusCode:200,
      headers:{ "Access-Control-Allow-Origin":"*" },
      body: JSON.stringify({
        user: data.username,
        role: data.role
      })
    };

  }catch(err){
    return { statusCode:200, body: JSON.stringify({ error: err.message }) };
  }

};
