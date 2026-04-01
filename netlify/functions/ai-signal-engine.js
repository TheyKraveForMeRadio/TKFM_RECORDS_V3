const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    const { data: trades } = await client
      .from("trades")
      .select("*")
      .order("created_at",{ ascending:false })
      .limit(50);

    if(!trades || trades.length === 0){
      return { statusCode:200, body: JSON.stringify({ signal:"hold" }) };
    }

    // 🔥 SIMPLE AI LOGIC (TREND DETECTION)
    const prices = trades.map(t => t.price);

    const avg =
      prices.reduce((a,b)=>a+b,0) / prices.length;

    const latest = prices[0];

    let signal = "hold";

    if(latest > avg * 1.02) signal = "sell";
    if(latest < avg * 0.98) signal = "buy";

    return {
      statusCode:200,
      headers:{ "Access-Control-Allow-Origin":"*" },
      body: JSON.stringify({
        signal,
        price: latest,
        avg
      })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
