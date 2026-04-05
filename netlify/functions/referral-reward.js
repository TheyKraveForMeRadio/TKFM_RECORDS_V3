const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    const { data: refs } = await client
      .from("referrals")
      .select("*");

    for(const r of refs){

      // 🔥 GIVE BONUS TO REFERRER
      await client.rpc("increment_balance",{
        username: r.referrer,
        amount: 5
      });

    }

    return {
      statusCode:200,
      body: JSON.stringify({ rewarded:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
