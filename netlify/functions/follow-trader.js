const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { follower, trader } = JSON.parse(event.body);

    await client.from("follows").insert([{ follower, trader }]);

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
