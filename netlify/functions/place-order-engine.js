const { client } = require("./_supabase");

const FEE_PERCENT = 0.02; // 2%

exports.handler = async (event) => {

  try{

    const { user, catalog_id, side, price, shares } =
      JSON.parse(event.body);

    const total = price * shares;
    const fee = total * FEE_PERCENT;
    const finalAmount = total - fee;

    // 🔥 INSERT ORDER
    await client.from("orders").insert([{
      user,
      catalog_id,
      side,
      price,
      shares
    }]);

    // 🔥 RECORD PLATFORM FEE
    await client.from("platform_fees").insert([{
      type:"trade",
      amount: fee
    }]);

    return {
      statusCode:200,
      body: JSON.stringify({
        success:true,
        fee,
        total: finalAmount
      })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
