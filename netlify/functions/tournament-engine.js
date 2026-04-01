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

    const { data: trades } = await client
      .from("trades")
      .select("*");

    for(const t of trades){

      const pnl = (t.price || 0) * (t.shares || 0);

      await client
        .from("tournament_pnl")
        .upsert([{
          username: t.buyer,
          season_id: season.id,
          pnl
        }], { onConflict:["username","season_id"] });

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
