const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const {
      user,
      catalog_id,
      type,
      side,
      price,
      shares,
      stop_price,
      take_profit,
      trailing_percent
    } = JSON.parse(event.body);

    const { data } = await client
      .from("advanced_orders")
      .insert([{
        username: user,
        catalog_id,
        type,
        side,
        price,
        stop_price,
        take_profit,
        trailing_percent,
        highest_price: 0,
        lowest_price: 999999,
        shares,
        status:"open"
      }])
      .select()
      .single();

    return {
      statusCode:200,
      body: JSON.stringify({ success:true, order:data })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
