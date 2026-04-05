const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { user, message } = JSON.parse(event.body);

    await client.from("notifications").insert([{
      username: user,
      message
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
