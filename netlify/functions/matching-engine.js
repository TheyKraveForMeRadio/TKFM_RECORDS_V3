const supabase = require("./_supabase");

exports.handler = async (event, context) => {

  try {

    const { data: buys, error: buyError } = await supabase
      .from("order_book")
      .select("*")
      .eq("side", "buy")
      .order("price", { ascending: false })
      .limit(1);

    const { data: sells, error: sellError } = await supabase
      .from("order_book")
      .select("*")
      .eq("side", "sell")
      .order("price", { ascending: true })
      .limit(1);

    if (buyError || sellError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: buyError?.message || sellError?.message })
      };
    }

    if (!buys.length || !sells.length) {
      return {
        statusCode: 200,
        body: JSON.stringify({ no_match: true })
      };
    }

    const buy = buys[0];
    const sell = sells[0];

    if (buy.price >= sell.price) {

      const tradeShares = Math.min(buy.shares, sell.shares);

      // INSERT TRADE
      const { error: tradeError } = await supabase
        .from("trades")
        .insert([{
          buyer: buy.user_id,
          seller: sell.user_id,
          catalog_id: buy.catalog_id,
          price: sell.price,
          shares: tradeShares
        }]);

      if (tradeError) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: tradeError.message })
        };
      }

      // DELETE ORDERS
      await supabase.from("order_book").delete().eq("id", buy.id);
      await supabase.from("order_book").delete().eq("id", sell.id);

      return {
        statusCode: 200,
        body: JSON.stringify({
          matched: true,
          price: sell.price,
          shares: tradeShares
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ no_match: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }

};
