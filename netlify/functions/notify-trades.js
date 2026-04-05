const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    const { data: trades } = await client
      .from("trades")
      .select("*")
      .order("created_at",{ ascending:false })
      .limit(5);

    for(const t of trades){

      // 🔥 NOTIFY BUYER
      await client.from("notifications").insert([{
        username: t.buyer,
        message: `📈 Bought ${t.shares} shares at $${t.price}`
      }]);

      // 🔥 NOTIFY SELLER
      await client.from("notifications").insert([{
        username: t.seller,
        message: `💰 Sold ${t.shares} shares at $${t.price}`
      }]);

    }

    return {
      statusCode:200,
      body: JSON.stringify({ sent:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
