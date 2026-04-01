const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    const { data: orders } = await client
      .from("advanced_orders")
      .select("*")
      .eq("status","open");

    const { data: trades } = await client
      .from("trades")
      .select("*")
      .order("created_at",{ ascending:false })
      .limit(1);

    if(!trades || trades.length === 0){
      return { statusCode:200, body: JSON.stringify({ ok:true }) };
    }

    const marketPrice = trades[0].price;

    for(const o of orders){

      let trigger = false;

      // 🔥 TRACK HIGHEST/LOWEST (FOR TRAILING)
      let highest = Math.max(o.highest_price || 0, marketPrice);
      let lowest = Math.min(o.lowest_price || 999999, marketPrice);

      await client
        .from("advanced_orders")
        .update({
          highest_price: highest,
          lowest_price: lowest
        })
        .eq("id", o.id);

      // 🔥 LIMIT
      if(o.type === "limit"){
        if(o.side === "buy" && marketPrice <= o.price) trigger = true;
        if(o.side === "sell" && marketPrice >= o.price) trigger = true;
      }

      // 🔥 STOP LOSS
      if(o.type === "stop"){
        if(o.side === "sell" && marketPrice <= o.stop_price) trigger = true;
        if(o.side === "buy" && marketPrice >= o.stop_price) trigger = true;
      }

      // 🔥 TAKE PROFIT
      if(o.take_profit){
        if(o.side === "sell" && marketPrice >= o.take_profit) trigger = true;
        if(o.side === "buy" && marketPrice <= o.take_profit) trigger = true;
      }

      // 🔥 TRAILING STOP
      if(o.trailing_percent){

        if(o.side === "sell"){
          const triggerPrice = highest * (1 - o.trailing_percent/100);
          if(marketPrice <= triggerPrice) trigger = true;
        }

        if(o.side === "buy"){
          const triggerPrice = lowest * (1 + o.trailing_percent/100);
          if(marketPrice >= triggerPrice) trigger = true;
        }
      }

      if(trigger){

        await client.from("orders").insert([{
          user:o.username,
          catalog_id:o.catalog_id,
          side:o.side,
          price: marketPrice,
          shares:o.shares
        }]);

        await client
          .from("advanced_orders")
          .update({ status:"filled" })
          .eq("id", o.id);

      }

    }

    return {
      statusCode:200,
      body: JSON.stringify({ triggered:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
