const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { user, room_id } = JSON.parse(event.body);

    // GET ROOM
    const { data: room } = await client
      .from("rooms")
      .select("*")
      .eq("id", room_id)
      .single();

    // GET USER
    const { data: u } = await client
      .from("users")
      .select("*")
      .eq("username", user)
      .single();

    if(u.balance < room.entry_fee){
      return { statusCode:200, body: JSON.stringify({ error:"Not enough balance" }) };
    }

    // DEDUCT ENTRY FEE
    await client.rpc("increment_balance",{
      username:user,
      amount: -room.entry_fee
    });

    // ADD TO ROOM
    await client.from("room_players").insert([{
      username:user,
      room_id
    }]);

    // ADD TO PRIZE POOL
    await client
      .from("rooms")
      .update({
        prize_pool: room.prize_pool + room.entry_fee
      })
      .eq("id", room_id);

    // ADD SMALL % TO JACKPOT
    await client.rpc("increment_jackpot",{ amount: room.entry_fee * 0.1 });

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
