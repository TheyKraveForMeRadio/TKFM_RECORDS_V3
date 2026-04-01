const { client } = require("./_supabase");

exports.handler = async (event) => {

  try{

    const { email } = JSON.parse(event.body);

    if(!email){
      return {
        statusCode:200,
        body: JSON.stringify({ error:"Email required" })
      };
    }

    await client.from("waitlist").insert([{
      email
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
