const { client, withTimeout } = require("./_supabase");

exports.handler = async () => {

  try{

    const [buysRes, sellsRes] = await Promise.all([
      withTimeout(
        client.from("order_book")
        .select("*")
        .eq("side","buy")
        .order("price",{ ascending:false })
        .limit(20)
      ),
      withTimeout(
        client.from("order_book")
        .select("*")
        .eq("side","sell")
        .order("price",{ ascending:true })
        .limit(20)
      )
    ]);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        buys: buysRes.data || [],
        sells: sellsRes.data || []
      })
    };

  }catch(err){
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: err.message })
    };
  }

};
