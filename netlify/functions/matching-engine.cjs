const supabase = require("./_supabase");

exports.handler = async () => {

  const { data: buys } = await supabase
    .from("order_book")
    .select("*")
    .eq("side","buy")
    .order("price",{ ascending:false })
    .limit(1);

  const { data: sells } = await supabase
    .from("order_book")
    .select("*")
    .eq("side","sell")
    .order("price",{ ascending:true })
    .limit(1);

  if(!buys.length || !sells.length){
    return {
      statusCode:200,
      body: JSON.stringify({ no_match:true })
    };
  }

  const buy = buys[0];
  const sell = sells[0];

  if(buy.price >= sell.price){

    const tradeShares = Math.min(buy.shares, sell.shares);

    await supabase.from("trades").insert([{
      buyer: buy.user_id,
      seller: sell.user_id,
      catalog_id: buy.catalog_id,
      price: sell.price,
      shares: tradeShares
    }]);

    await supabase.from("order_book").delete().eq("id", buy.id);
    await supabase.from("order_book").delete().eq("id", sell.id);

    return {
      statusCode:200,
      body: JSON.stringify({ matched:true })
    };
  }

  return {
    statusCode:200,
    body: JSON.stringify({ no_match:true })
  };

};
