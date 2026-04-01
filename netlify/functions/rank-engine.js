const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    const { data: users } = await client.from("user_pnl").select("*");

    for(const u of users){

      let rank = "Bronze";
      let badge = "New Trader";

      if(u.pnl > 100) { rank = "Silver"; badge = "Rising Trader"; }
      if(u.pnl > 500) { rank = "Gold"; badge = "Pro Trader"; }
      if(u.pnl > 1000){ rank = "Platinum"; badge = "Elite"; }

      await client
        .from("users")
        .update({
          rank,
          badge,
          verified: u.pnl > 1000
        })
        .eq("username", u.user);

    }

    return {
      statusCode:200,
      body: JSON.stringify({ success:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
