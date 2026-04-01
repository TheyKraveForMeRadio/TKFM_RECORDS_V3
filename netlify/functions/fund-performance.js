const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const trader = event.queryStringParameters.trader;

    const { data: trades } = await client
      .from("trades")
      .select("*")
      .eq("buyer", trader);

    let pnl = 0;

    for(const t of trades){
      pnl += (t.price || 0) * (t.shares || 0);
    }

    return {
      statusCode:200,
      body: JSON.stringify({ pnl })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
