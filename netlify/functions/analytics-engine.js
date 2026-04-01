const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const user = event.queryStringParameters.user;

    const { data: trades } = await client
      .from("trades")
      .select("*")
      .or(`buyer.eq.${user},seller.eq.${user}`);

    if(!trades || trades.length === 0){
      return {
        statusCode:200,
        body: JSON.stringify({ pnl:0, winRate:0, trades:0 })
      };
    }

    let pnl = 0;
    let wins = 0;
    let losses = 0;

    for(const t of trades){

      const value = (t.price || 0) * (t.shares || 0);

      // 🔥 SIMPLE PNL MODEL
      if(t.buyer === user){
        pnl -= value;
        losses++;
      }

      if(t.seller === user){
        pnl += value;
        wins++;
      }

    }

    const totalTrades = trades.length;
    const winRate = totalTrades > 0
      ? (wins / totalTrades * 100).toFixed(2)
      : 0;

    // 🔥 RISK METRICS
    const avgTrade = pnl / totalTrades;

    return {
      statusCode:200,
      body: JSON.stringify({
        pnl,
        winRate,
        totalTrades,
        wins,
        losses,
        avgTrade
      })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
