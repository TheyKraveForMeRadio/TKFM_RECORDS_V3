const { client } = require("./_supabase");

exports.handler = async () => {

  try{

    const signalRes = await fetch(
      process.env.SITE_URL + "/.netlify/functions/ai-signal-engine"
    );

    const { signal, price } = await signalRes.json();

    if(signal === "hold"){
      return { statusCode:200, body: JSON.stringify({ ok:true }) };
    }

    // 🔥 GET AI USERS (ELITE ONLY)
    const { data: users } = await client
      .from("users")
      .select("*")
      .eq("plan","elite");

    for(const u of users){

      await client.from("orders").insert([{
        user: u.username,
        catalog_id: "1",
        side: signal,
        price,
        shares: 1
      }]);

    }

    return {
      statusCode:200,
      body: JSON.stringify({ executed:true, signal })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
