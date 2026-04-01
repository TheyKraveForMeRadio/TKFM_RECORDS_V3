const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { user, action } = JSON.parse(event.body);

    let xp = 0;

    if(action === "trade") xp = 5;
    if(action === "upload") xp = 10;
    if(action === "profit_trade") xp = 15;

    if(xp > 0){
      await client.rpc("increment_xp",{
        username: user,
        amount: xp
      });
    }

    return {
      statusCode:200,
      body: JSON.stringify({ xp })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
