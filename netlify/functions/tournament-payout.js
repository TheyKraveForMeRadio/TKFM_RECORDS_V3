const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    const { data: season } = await client
      .from("seasons")
      .select("*")
      .eq("active", true)
      .single();

    if(!season){
      return { statusCode:200, body: JSON.stringify({ ok:true }) };
    }

    const now = new Date();

    if(new Date(season.end_date) > now){
      return { statusCode:200, body: JSON.stringify({ ok:true }) };
    }

    const { data: leaders } = await client
      .from("tournament_pnl")
      .select("*")
      .eq("season_id", season.id)
      .order("pnl",{ ascending:false })
      .limit(3);

    const rewards = [0.5, 0.3, 0.2]; // 50%, 30%, 20%

    for(let i=0;i<leaders.length;i++){

      const payout = season.prize_pool * rewards[i];

      await client.rpc("increment_balance",{
        username: leaders[i].username,
        amount: payout
      });

    }

    // CLOSE SEASON
    await client
      .from("seasons")
      .update({ active:false })
      .eq("id", season.id);

    return {
      statusCode:200,
      body: JSON.stringify({ paid:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
