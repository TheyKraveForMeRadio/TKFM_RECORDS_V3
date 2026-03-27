const supabase = require("./_supabase");

exports.handler = async (event) => {

  const { user, catalog_id, side, price, shares } = JSON.parse(event.body);

  const { data, error } = await supabase
    .from("order_book")
    .insert([{
      user_id: user,
      catalog_id,
      side,
      price,
      shares
    }]);

  if(error){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, data })
  };
};
