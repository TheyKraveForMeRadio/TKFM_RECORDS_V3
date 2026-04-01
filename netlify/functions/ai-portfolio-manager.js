const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    // 🔥 GET ELITE USERS ONLY
    const { data: users } = await client
      .from("users")
      .select("*")
      .eq("plan","elite");

    if(!users || users.length === 0){
      return { statusCode:200, body: JSON.stringify({ ok:true }) };
    }

    for(const u of users){

      // 🔥 GET USER PORTFOLIO
      const { data: portfolio } = await client
        .from("portfolios")
        .select("*")
        .eq("username", u.username);

      if(!portfolio || portfolio.length === 0) continue;

      // 🔥 CALCULATE TOTAL VALUE
      let totalValue = 0;

      for(const p of portfolio){
        totalValue += (p.shares || 0) * (p.price || 0);
      }

      // 🔥 RISK RULES
      const maxAssetPercent = 0.4; // 40% max per asset
      const rebalanceTrades = [];

      for(const p of portfolio){

        const value = (p.shares || 0) * (p.price || 0);
        const percent = value / totalValue;

        // 🔴 OVERWEIGHT → SELL
        if(percent > maxAssetPercent){

          const excessValue = value - (totalValue * maxAssetPercent);
          const sharesToSell = Math.ceil(excessValue / p.price);

          rebalanceTrades.push({
            user: u.username,
            catalog_id: p.catalog_id,
            side: "sell",
            price: p.price,
            shares: sharesToSell
          });
        }

        // 🟢 UNDERWEIGHT → BUY
        if(percent < 0.1){

          const targetValue = totalValue * 0.15;
          const needed = targetValue - value;
          const sharesToBuy = Math.ceil(needed / p.price);

          rebalanceTrades.push({
            user: u.username,
            catalog_id: p.catalog_id,
            side: "buy",
            price: p.price,
            shares: sharesToBuy
          });
        }

      }

      // 🔥 EXECUTE REBALANCE
      for(const t of rebalanceTrades){
        await client.from("orders").insert([t]);
      }

    }

    return {
      statusCode:200,
      body: JSON.stringify({ rebalanced:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
