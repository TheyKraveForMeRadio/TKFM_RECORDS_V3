const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { ref, user } = JSON.parse(event.body);

    if(!ref || !user){
      return { statusCode:200, body: JSON.stringify({ ok:true }) };
    }

    await client.from("referrals").insert([{
      referrer: ref,
      referred: user
    }]);

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
