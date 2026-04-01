const { client } = require("./_supabase");

const FEE_PERCENT = 0.05; // 5%

exports.handler = async (event) => {

  try{

    const { investor, trader, amount } = JSON.parse(event.body);

    const fee = amount * FEE_PERCENT;
    const net = amount - fee;

    let { data: fund } = await client
      .from("funds")
      .select("*")
      .eq("trader", trader)
      .single();

    if(!fund){
      const res = await client
        .from("funds")
        .insert([{ trader, total_value:0 }])
        .select()
        .single();
      fund = res.data;
    }

    const shares = net;

    await client.from("investments").insert([{
      investor,
      fund_id: fund.id,
      amount: net,
      shares
    }]);

    await client
      .from("funds")
      .update({
        total_value: fund.total_value + net
      })
      .eq("id", fund.id);

    // 🔥 RECORD PLATFORM FEE
    await client.from("platform_fees").insert([{
      type:"investment",
      amount: fee
    }]);

    return {
      statusCode:200,
      body: JSON.stringify({ success:true, fee })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
