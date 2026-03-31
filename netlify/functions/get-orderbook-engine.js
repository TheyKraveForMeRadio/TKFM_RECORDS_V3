const { client } = require("./_supabase");

exports.handler = async () => {
  try {

    const { data: buys } = await client
      .from("order_book")
      .select("*")
      .eq("side","buy")
      .order("price",{ ascending:false })
      .limit(20);

    const { data: sells } = await client
      .from("order_book")
      .select("*")
      .eq("side","sell")
      .order("price",{ ascending:true })
      .limit(20);

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        buys: buys || [],
        sells: sells || []
      })
    };

  } catch(err){
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
