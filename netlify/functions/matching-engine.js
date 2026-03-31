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
      const total = shares * sell.price;

      // 🔥 GET USERS
      const { data: buyerUser } = await client
        .from("users")
        .select("*")
        .eq("username", buy.user)
        .single();

      const { data: sellerUser } = await client
        .from("users")
        .select("*")
        .eq("username", sell.user)
        .single();

      if(!buyerUser || !sellerUser){
        return { statusCode:200, body: JSON.stringify({ error:"user missing" }) };
      }

      // 🔥 CHECK BALANCE
      if(buyerUser.balance < total){
        return { statusCode:200, body: JSON.stringify({ error:"insufficient funds" }) };
      }

      // 🔥 UPDATE BALANCES
      await client.from("users").update({
        balance: buyerUser.balance - total
      }).eq("id", buyerUser.id);

      await client.from("users").update({
        balance: sellerUser.balance + total
      }).eq("id", sellerUser.id);

      // 🔥 UPDATE PORTFOLIO (BUYER)
      const { data: existing } = await client
        .from("portfolios")
        .select("*")
        .eq("user_id", buyerUser.id)
        .eq("catalog_id", buy.catalog_id)
        .maybeSingle();

      if(existing){
        await client.from("portfolios").update({
          shares: existing.shares + shares
        }).eq("id", existing.id);
      } else {
        await client.from("portfolios").insert([{
          user_id: buyerUser.id,
          catalog_id: buy.catalog_id,
          shares
        }]);
      }

      // 🔥 SELLER REMOVE SHARES (optional simple version: skip strict check)

      // 🔥 INSERT TRADE
      await client.from("trades").insert([{
        buyer: buy.user,
        seller: sell.user,
        catalog_id: buy.catalog_id,
        price: sell.price,
        shares,
        total
      }]);

      // 🔥 REMOVE ORDERS
      await client.from("order_book").delete().eq("id", buy.id);
      await client.from("order_book").delete().eq("id", sell.id);

      return { statusCode:200, body: JSON.stringify({ matched:true }) };
    }

    return { statusCode:200, body: JSON.stringify({ no_match:true }) };

  } catch(err){
    return { statusCode:200, body: JSON.stringify({ error: err.message }) };
  }
};
