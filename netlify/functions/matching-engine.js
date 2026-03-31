const { client } = require("./_supabase");

exports.handler = async () => {
  try {

    const { data: buys } = await client
      .from("order_book")
      .select("*")
      .eq("side","buy")
      .order("price",{ascending:false})
      .limit(1);

    const { data: sells } = await client
      .from("order_book")
      .select("*")
      .eq("side","sell")
      .order("price",{ascending:true})
      .limit(1);

    if(!buys?.length || !sells?.length){
      return { statusCode:200, body: JSON.stringify({ no_match:true }) };
    }

    const buy = buys[0];
    const sell = sells[0];

    if(buy.price >= sell.price){

      const shares = Math.min(buy.shares, sell.shares);

      await client.from("trades").insert([{
        buyer: buy.user,
        seller: sell.user,
        catalog_id: buy.catalog_id,
        price: sell.price,
        shares
      }]);

      await client.from("order_book").delete().eq("id", buy.id);
      await client.from("order_book").delete().eq("id", sell.id);

      return { statusCode:200, body: JSON.stringify({ matched:true }) };
    }

    return { statusCode:200, body: JSON.stringify({ no_match:true }) };

  } catch(err){
    return { statusCode:200, body: JSON.stringify({ error: err.message }) };
  }
};
