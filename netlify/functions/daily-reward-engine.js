const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { user } = JSON.parse(event.body);

    const { data } = await client
      .from("users")
      .select("*")
      .eq("username", user)
      .single();

    const now = new Date();
    const last = data.last_daily ? new Date(data.last_daily) : null;

    let canClaim = true;

    if(last){
      const diff = (now - last) / (1000*60*60);
      if(diff < 24) canClaim = false;
    }

    if(!canClaim){
      return { statusCode:200, body: JSON.stringify({ error:"Already claimed" }) };
    }

    const streak = (data.streak || 0) + 1;
    const reward = 10 + (streak * 2);

    await client
      .from("users")
      .update({
        xp: (data.xp || 0) + reward,
        last_daily: now,
        streak
      })
      .eq("username", user);

    return {
      statusCode:200,
      body: JSON.stringify({
        success:true,
        reward,
        streak
      })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
