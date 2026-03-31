const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const username = event.queryStringParameters?.user;

    if(!username){
      return { statusCode:200, body: JSON.stringify({ error:"missing user" }) };
    }

    // USER
    const { data: user } = await client
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    // PORTFOLIO
    const { data: portfolio } = await client
      .from("portfolios")
      .select("*")
      .eq("user_id", user.id);

    // TRADES
    const { data: trades } = await client
      .from("trades")
      .select("*")
      .or(`buyer.eq.${username},seller.eq.${username}`)
      .order("created_at",{ ascending:false });

    return {
      statusCode:200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        user,
        portfolio,
        trades
      })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
