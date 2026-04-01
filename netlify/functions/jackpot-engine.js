const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    const { data: jp } = await client
      .from("jackpot")
      .select("*")
      .limit(1)
      .single();

    if(!jp || jp.amount < 100){
      return { statusCode:200, body: JSON.stringify({ ok:true }) };
    }

    // RANDOM WINNER
    const { data: players } = await client
      .from("room_players")
      .select("*");

    if(!players || players.length === 0){
      return { statusCode:200, body: JSON.stringify({ ok:true }) };
    }

    const winner = players[Math.floor(Math.random()*players.length)];

    await client.rpc("increment_balance",{
      username: winner.username,
      amount: jp.amount
    });

    // RESET JACKPOT
    await client.from("jackpot").update({ amount:0 });

    return {
      statusCode:200,
      body: JSON.stringify({ winner: winner.username })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
