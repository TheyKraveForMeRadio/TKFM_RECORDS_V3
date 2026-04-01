const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    // GET LATEST TRADE
    const { data: trades } = await client
      .from("trades")
      .select("*")
      .order("created_at",{ ascending:false })
      .limit(1);

    if(!trades || trades.length === 0){
      return { statusCode:200, body: JSON.stringify({ ok:true }) };
    }

    const trade = trades[0];

    // GET FOLLOWERS
    const { data: followers } = await client
      .from("follows")
      .select("*")
      .eq("trader", trade.buyer);

    for(const f of followers){

      await client.from("orders").insert([{
        user: f.follower,
        catalog_id: trade.catalog_id,
        side: trade.side || "buy",
        price: trade.price,
        shares: trade.shares
      }]);

    }

    return {
      statusCode:200,
      body: JSON.stringify({ copied:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
